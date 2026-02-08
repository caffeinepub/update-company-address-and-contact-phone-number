import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface CompanyInfo {
    missionStatement: string;
    businessHours: string;
    capabilities: string;
    name: string;
    history: string;
    email: string;
    address: string;
    phone: string;
}
export interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Product {
    id: string;
    specifications: string;
    name: string;
    description: string;
    category: ProductCategory;
    applications: string;
    images: Array<ExternalBlob>;
}
export interface Industry {
    id: string;
    name: string;
    description: string;
}
export enum ProductCategory {
    scrapShredders = "scrapShredders",
    billetShearingMachines = "billetShearingMachines",
    eotCranes = "eotCranes"
}
export interface backendInterface {
    addIndustry(industry: Industry): Promise<void>;
    addProduct(product: Product): Promise<void>;
    getAllInquiries(): Promise<Array<ContactInquiry>>;
    getCompanyInfo(): Promise<CompanyInfo>;
    getIndustries(): Promise<Array<Industry>>;
    getProduct(id: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    removeProduct(id: string): Promise<void>;
    submitContactInquiry(inquiry: ContactInquiry): Promise<void>;
}
