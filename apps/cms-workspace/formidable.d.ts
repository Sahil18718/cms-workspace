declare module 'formidable' {
    import { IncomingMessage } from 'http';

    interface File {
        filepath: string;
        newFilename: string;
        originalFilename: string | null;
        mimetype: string | null;
        size: number;
    }

    interface Files {
        [key: string]: File | File[];
    }

    interface Fields {
        [key: string]: string | string[];
    }

    class IncomingForm {
        uploadDir: string;
        keepExtensions: boolean;
        multiples: boolean;

        parse(
            req: IncomingMessage,
            callback: (
                err: Error | null,
                fields: Fields,
                files: Files
            ) => void
        ): void;
    }

    export = IncomingForm;
}
