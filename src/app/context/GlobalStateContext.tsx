"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as appConstants from "@utils/appConstants"

type GlobalStateContextType = {
    language: appConstants.SupportedLanguageType;
    setLanguage: (language: appConstants.SupportedLanguageType) => void;
};

