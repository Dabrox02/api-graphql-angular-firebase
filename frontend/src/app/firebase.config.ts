import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { firebaseEnviroment } from "../enviroments/firebaseEnviroment";

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseEnviroment)),
    provideAuth(() => getAuth())
])

export { firebaseProviders };