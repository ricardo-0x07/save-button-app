/// <reference path="../../../../typings/browser.d.ts"/>

    export default interface IOppertunity {
        id: number;
        name: string;
        imagePath: string;
        description: string;
        location: string;
        created_at?: string;
        updated_at?: string;
    };
