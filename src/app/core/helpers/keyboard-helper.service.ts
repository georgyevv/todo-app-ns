import { Injectable } from "@angular/core";
import * as application from "tns-core-modules/application";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import * as utils from "tns-core-modules/utils/utils";

declare var UIApplication;

@Injectable({
    providedIn: "root"
})
export class KeyboardHelperService {
    public dismissSoftKeybaord() {
        if (isIOS) {
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.endEditing(true);
        }
        if (isAndroid) {
            const dialogFragment = application.android.foregroundActivity.getFragmentManager().findFragmentByTag("dialog");
            if (dialogFragment) {
                utils.ad.dismissSoftInput(dialogFragment.getDialog().getCurrentFocus());
            } else {
                utils.ad.dismissSoftInput();
            }
        }
    }
}
