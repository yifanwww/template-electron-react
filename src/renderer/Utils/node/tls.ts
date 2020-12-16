// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import tls, {
    Certificate,
    CipherNameAndProtocol,
    CommonConnectionOptions,
    ConnectionOptions,
    DetailedPeerCertificate,
    EphemeralKeyInfo,
    KeyObject,
    PeerCertificate,
    PxfObject,
    SecureContext,
    SecureContextOptions,
    SecurePair,
    SecureVersion,
    TLSSocketOptions,
    TlsOptions,
} from 'tls';
export type {
    Certificate,
    CipherNameAndProtocol,
    CommonConnectionOptions,
    ConnectionOptions,
    DetailedPeerCertificate,
    EphemeralKeyInfo,
    KeyObject,
    PeerCertificate,
    PxfObject,
    SecureContext,
    SecureContextOptions,
    SecurePair,
    SecureVersion,
    TLSSocketOptions,
    TlsOptions,
};

const _ = window.require('tls') as typeof tls;
export default _;

const { Server, TLSSocket } = _;
export { Server, TLSSocket };
