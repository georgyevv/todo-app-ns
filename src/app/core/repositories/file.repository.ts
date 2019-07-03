import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { UploadFileResult, ProgressStatus } from "nativescript-plugin-firebase/storage/storage";
import { LoggerService } from "../services/logger.service";

@Injectable()
export class FileRepository {
    constructor(private readonly loggerService: LoggerService) {}

    public uploadUserProfilePicture(localFullPath: string, remoteFullPath: string): Promise<UploadFileResult> {
        return firebase.storage.uploadFile({
            remoteFullPath: remoteFullPath,
            localFullPath: localFullPath,
            onProgress: (status: ProgressStatus) => {
                this.loggerService.log("Uploaded fraction: " + status.fractionCompleted);
                this.loggerService.log("Percentage complete: " + status.percentageCompleted);
            }
        });
    }

    public getDownloadURL(remoteFullPath: string) {
        return firebase.storage.getDownloadUrl({
            remoteFullPath: remoteFullPath
        });
    }
}
