import { Injectable, NgZone } from "@angular/core";
import * as imagepicker from "nativescript-imagepicker";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

import { FileRepository } from "../repositories/file.repository";
import { Store } from "../state/app-store";
import { LoggerService } from "./logger.service";
import { ServerErrorHandlerService } from "./server-error-handler.service";
import { UploadFileResult } from 'nativescript-plugin-firebase/storage/storage';

@Injectable({
    providedIn: "root"
})
export class FileService {
    constructor(
        private readonly repo: FileRepository,
        private store: Store) {}

    public async uploadUserProfilePicture(localFullPath: string): Promise<string> {
        const currentUser = this.store.value.currentUser;
        const imageName = localFullPath.substring(localFullPath.lastIndexOf("/") + 1, localFullPath.length);
        const remoteFullPath = `users/${ currentUser.uid}/${imageName}`;

        const fileResult = await this.repo.uploadUserProfilePicture(localFullPath, remoteFullPath);
        const remoteURL = currentUser.photoURL = await this.getDownloadURL(remoteFullPath);

        return remoteURL;
    }

    public async selectImageFromPhone(): Promise<ImageAsset> {
        let context = imagepicker.create({
            mode: "single"
        });

        await context.authorize();
        const images: ImageAsset[] = await context.present();
        const imageSRC = images.length > 0 ? images[0] : null;

        return imageSRC;
    }

    public getDownloadURL(remoteFullPath: string): Promise<string> {
        return this.repo.getDownloadURL(remoteFullPath);
    }
}
