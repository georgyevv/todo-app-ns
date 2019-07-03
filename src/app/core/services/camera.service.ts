import { Injectable } from "@angular/core";
import * as camera from "nativescript-camera";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import { LoggerService } from "./logger.service";

@Injectable({
    providedIn: "root"
})
export class CameraService {
    constructor(private readonly loggerService: LoggerService) {}

    public async takePicture(): Promise<ImageAsset> {
        try {
            await camera.requestPermissions();
            const cameraOptions = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };

            try {
                const imageAsset = await camera.takePicture(cameraOptions);

                return imageAsset;
            } catch (error) {
                this.loggerService.error("Error -> " + error.message);
            }
        } catch {
            this.loggerService.error("Camera permissions rejected");
        }
    }
}
