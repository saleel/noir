import { flattenFieldsAsArray } from './public_inputs.js';
import { BarretenbergVerifier as BarretenbergVerifierInternal } from '@aztec/bb.js';
export class BarretenbergVerifier {
    verifier;
    constructor(options = { threads: 1 }) {
        this.verifier = new BarretenbergVerifierInternal(options);
    }
    /** @description Verifies a proof */
    async verifyProof(proofData, verificationKey) {
        const proof = reconstructProofWithPublicInputs(proofData);
        return this.verifier.verifyUltraplonkProof(proof, verificationKey);
    }
    async destroy() {
        await this.verifier.destroy();
    }
}
export function reconstructProofWithPublicInputs(proofData) {
    // Flatten publicInputs
    const publicInputsConcatenated = flattenFieldsAsArray(proofData.publicInputs);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...publicInputsConcatenated, ...proofData.proof]);
    return proofWithPublicInputs;
}
export class UltraHonkVerifier {
    verifier;
    constructor(options = { threads: 1 }) {
        this.verifier = new BarretenbergVerifierInternal(options);
    }
    /** @description Verifies a proof */
    async verifyProof(proofData, verificationKey) {
        const proof = reconstructProofWithPublicInputsHonk(proofData);
        return this.verifier.verifyUltrahonkProof(proof, verificationKey);
    }
    async destroy() {
        await this.verifier.destroy();
    }
}
const serializedBufferSize = 4;
const fieldByteSize = 32;
const publicInputOffset = 3;
const publicInputsOffsetBytes = publicInputOffset * fieldByteSize;
export function reconstructProofWithPublicInputsHonk(proofData) {
    // Flatten publicInputs
    const publicInputsConcatenated = flattenFieldsAsArray(proofData.publicInputs);
    const proofStart = proofData.proof.slice(0, publicInputsOffsetBytes + serializedBufferSize);
    const proofEnd = proofData.proof.slice(publicInputsOffsetBytes + serializedBufferSize);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...proofStart, ...publicInputsConcatenated, ...proofEnd]);
    return proofWithPublicInputs;
}
