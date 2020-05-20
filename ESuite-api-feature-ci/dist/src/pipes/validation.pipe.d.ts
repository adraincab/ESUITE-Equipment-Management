import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidationPipe implements PipeTransform<any> {
    private static readonly logger;
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
