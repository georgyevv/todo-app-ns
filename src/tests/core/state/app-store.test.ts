import "reflect-metadata";
import { Store } from "../../../app/core/state/app-store";

describe("App Store", () => {
    it("set current user", () => {
        const store = new Store();
        store.set("currentUser", { displayName: "Yordan" });

        expect(store.value.currentUser.displayName).toBe("Yordan");
    });
});
