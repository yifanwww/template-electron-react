import chalk from 'chalk';
import table from 'text-table';
import type { Compiler } from 'webpack';

export class WebpackStatsPrettifyPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.done.tap('WebpackStatsPrettifyPlugin', (stats) => {
            const { assets } = stats.toJson({});
            if (!assets) return;

            const data: string[][] = [];

            for (const asset of assets.sort((a, b) => b.size - a.size)) {
                const size =
                    asset.size / 1024 > 1024
                        ? `${(asset.size / 1024 / 1024).toFixed(2)} MiB`
                        : `${(asset.size / 1024).toFixed(2)} KiB`;
                const cached = asset.cached ? '[cached]' : ' ';
                const chunks = asset.chunks ? `chunks[${asset.chunks?.length}]` : ' ';
                const isOverSizeLimit = asset.isOverSizeLimit ? '[big]' : '';

                data.push(
                    [asset.name, size, cached, chunks, isOverSizeLimit].map((item) =>
                        isOverSizeLimit ? chalk.yellow(item) : chalk.green(item),
                    ),
                );
            }

            console.info();
            console.info(
                table(data, {
                    hsep: '  ',
                    align: ['r', 'r', 'c', 'c', 'c'],
                }),
            );
            console.info();
        });
    }
}
