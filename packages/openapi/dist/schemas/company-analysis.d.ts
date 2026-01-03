import { z } from 'zod';
export declare const CompetitorSchema: z.ZodObject<{
    id: z.ZodString;
    no: z.ZodNumber;
    companyName: z.ZodString;
    sales: z.ZodOptional<z.ZodString>;
    targetMarketSegment: z.ZodOptional<z.ZodString>;
    competitiveAdvantagePoint: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    no: number;
    companyName: string;
    sales?: string | undefined;
    targetMarketSegment?: string | undefined;
    competitiveAdvantagePoint?: string | undefined;
}, {
    id: string;
    no: number;
    companyName: string;
    sales?: string | undefined;
    targetMarketSegment?: string | undefined;
    competitiveAdvantagePoint?: string | undefined;
}>;
export declare const CompanyPositionSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    description: string;
}, {
    id: string;
    description: string;
}>;
export declare const CompetitorStrategySchema: z.ZodObject<{
    id: z.ZodString;
    companyName: z.ZodString;
    pricePosition: z.ZodEnum<["low", "medium", "high"]>;
    valuePosition: z.ZodEnum<["low", "medium", "high"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    companyName: string;
    pricePosition: "low" | "medium" | "high";
    valuePosition: "low" | "medium" | "high";
}, {
    id: string;
    companyName: string;
    pricePosition: "low" | "medium" | "high";
    valuePosition: "low" | "medium" | "high";
}>;
export declare const IndustryPlayerCharacteristicSchema: z.ZodObject<{
    id: z.ZodString;
    characteristic: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    characteristic: string;
}, {
    id: string;
    characteristic: string;
}>;
export declare const ExternalInternalAnalysisSchema: z.ZodObject<{
    id: z.ZodString;
    strengths: z.ZodArray<z.ZodString, "many">;
    weaknesses: z.ZodArray<z.ZodString, "many">;
    opportunities: z.ZodArray<z.ZodString, "many">;
    threats: z.ZodArray<z.ZodString, "many">;
    targetPosition: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    targetPosition?: string | undefined;
}, {
    id: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    targetPosition?: string | undefined;
}>;
export declare const MarketResearchSchema: z.ZodObject<{
    id: z.ZodString;
    marketMacro: z.ZodOptional<z.ZodString>;
    marketSegment: z.ZodOptional<z.ZodString>;
    customerCharacteristics: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    marketMacro?: string | undefined;
    marketSegment?: string | undefined;
    customerCharacteristics?: string | undefined;
}, {
    id: string;
    marketMacro?: string | undefined;
    marketSegment?: string | undefined;
    customerCharacteristics?: string | undefined;
}>;
export declare const CompetitiveAdvantageSchema: z.ZodObject<{
    id: z.ZodString;
    strategy: z.ZodOptional<z.ZodString>;
    organization: z.ZodOptional<z.ZodString>;
    system: z.ZodOptional<z.ZodString>;
    technology: z.ZodOptional<z.ZodString>;
    talent: z.ZodOptional<z.ZodString>;
    values: z.ZodOptional<z.ZodString>;
    competitiveAdvantageSource: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    values?: string | undefined;
    strategy?: string | undefined;
    organization?: string | undefined;
    system?: string | undefined;
    technology?: string | undefined;
    talent?: string | undefined;
    competitiveAdvantageSource?: string | undefined;
}, {
    id: string;
    values?: string | undefined;
    strategy?: string | undefined;
    organization?: string | undefined;
    system?: string | undefined;
    technology?: string | undefined;
    talent?: string | undefined;
    competitiveAdvantageSource?: string | undefined;
}>;
export declare const FutureMarketOutlookSchema: z.ZodObject<{
    id: z.ZodString;
    marketChanges: z.ZodOptional<z.ZodString>;
    customerChanges: z.ZodOptional<z.ZodString>;
    competitiveChanges: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    marketChanges?: string | undefined;
    customerChanges?: string | undefined;
    competitiveChanges?: string | undefined;
}, {
    id: string;
    marketChanges?: string | undefined;
    customerChanges?: string | undefined;
    competitiveChanges?: string | undefined;
}>;
export declare const CompanyAnalysisSchema: z.ZodObject<{
    id: z.ZodString;
    companyName: z.ZodString;
    representative: z.ZodOptional<z.ZodString>;
    foundedDate: z.ZodOptional<z.ZodString>;
    employees: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    competitors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        no: z.ZodNumber;
        companyName: z.ZodString;
        sales: z.ZodOptional<z.ZodString>;
        targetMarketSegment: z.ZodOptional<z.ZodString>;
        competitiveAdvantagePoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }>, "many">>;
    companyPosition: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>;
    competitorStrategies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyName: z.ZodString;
        pricePosition: z.ZodEnum<["low", "medium", "high"]>;
        valuePosition: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }>, "many">>;
    industryPlayerCharacteristics: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>;
    externalInternalAnalysis: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strengths: z.ZodArray<z.ZodString, "many">;
        weaknesses: z.ZodArray<z.ZodString, "many">;
        opportunities: z.ZodArray<z.ZodString, "many">;
        threats: z.ZodArray<z.ZodString, "many">;
        targetPosition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }>>;
    marketResearch: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketMacro: z.ZodOptional<z.ZodString>;
        marketSegment: z.ZodOptional<z.ZodString>;
        customerCharacteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }>>;
    competitiveAdvantage: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strategy: z.ZodOptional<z.ZodString>;
        organization: z.ZodOptional<z.ZodString>;
        system: z.ZodOptional<z.ZodString>;
        technology: z.ZodOptional<z.ZodString>;
        talent: z.ZodOptional<z.ZodString>;
        values: z.ZodOptional<z.ZodString>;
        competitiveAdvantageSource: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }>>;
    futureMarketOutlook: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketChanges: z.ZodOptional<z.ZodString>;
        customerChanges: z.ZodOptional<z.ZodString>;
        competitiveChanges: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }>>;
    notes: z.ZodOptional<z.ZodString>;
    comments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        authorId: z.ZodOptional<z.ZodString>;
        authorName: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }, {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }>, "many">>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    companyName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    companyName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}>;
export declare const CreateCompanyAnalysisSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    companyName: z.ZodString;
    representative: z.ZodOptional<z.ZodString>;
    foundedDate: z.ZodOptional<z.ZodString>;
    employees: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    competitors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        no: z.ZodNumber;
        companyName: z.ZodString;
        sales: z.ZodOptional<z.ZodString>;
        targetMarketSegment: z.ZodOptional<z.ZodString>;
        competitiveAdvantagePoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }>, "many">>;
    companyPosition: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>;
    competitorStrategies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyName: z.ZodString;
        pricePosition: z.ZodEnum<["low", "medium", "high"]>;
        valuePosition: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }>, "many">>;
    industryPlayerCharacteristics: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>;
    externalInternalAnalysis: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strengths: z.ZodArray<z.ZodString, "many">;
        weaknesses: z.ZodArray<z.ZodString, "many">;
        opportunities: z.ZodArray<z.ZodString, "many">;
        threats: z.ZodArray<z.ZodString, "many">;
        targetPosition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }>>;
    marketResearch: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketMacro: z.ZodOptional<z.ZodString>;
        marketSegment: z.ZodOptional<z.ZodString>;
        customerCharacteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }>>;
    competitiveAdvantage: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strategy: z.ZodOptional<z.ZodString>;
        organization: z.ZodOptional<z.ZodString>;
        system: z.ZodOptional<z.ZodString>;
        technology: z.ZodOptional<z.ZodString>;
        talent: z.ZodOptional<z.ZodString>;
        values: z.ZodOptional<z.ZodString>;
        competitiveAdvantageSource: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }>>;
    futureMarketOutlook: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketChanges: z.ZodOptional<z.ZodString>;
        customerChanges: z.ZodOptional<z.ZodString>;
        competitiveChanges: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }>>;
    notes: z.ZodOptional<z.ZodString>;
    comments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        authorId: z.ZodOptional<z.ZodString>;
        authorName: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }, {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }>, "many">>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    companyName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}, {
    companyName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}>;
export declare const UpdateCompanyAnalysisSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    companyName: z.ZodOptional<z.ZodString>;
    representative: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    foundedDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    employees: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    competitors: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        no: z.ZodNumber;
        companyName: z.ZodString;
        sales: z.ZodOptional<z.ZodString>;
        targetMarketSegment: z.ZodOptional<z.ZodString>;
        competitiveAdvantagePoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }, {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }>, "many">>>;
    companyPosition: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>>;
    competitorStrategies: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyName: z.ZodString;
        pricePosition: z.ZodEnum<["low", "medium", "high"]>;
        valuePosition: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }, {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }>, "many">>>;
    industryPlayerCharacteristics: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>>;
    externalInternalAnalysis: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strengths: z.ZodArray<z.ZodString, "many">;
        weaknesses: z.ZodArray<z.ZodString, "many">;
        opportunities: z.ZodArray<z.ZodString, "many">;
        threats: z.ZodArray<z.ZodString, "many">;
        targetPosition: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }, {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    }>>>;
    marketResearch: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketMacro: z.ZodOptional<z.ZodString>;
        marketSegment: z.ZodOptional<z.ZodString>;
        customerCharacteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }, {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    }>>>;
    competitiveAdvantage: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        strategy: z.ZodOptional<z.ZodString>;
        organization: z.ZodOptional<z.ZodString>;
        system: z.ZodOptional<z.ZodString>;
        technology: z.ZodOptional<z.ZodString>;
        talent: z.ZodOptional<z.ZodString>;
        values: z.ZodOptional<z.ZodString>;
        competitiveAdvantageSource: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }, {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    }>>>;
    futureMarketOutlook: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        marketChanges: z.ZodOptional<z.ZodString>;
        customerChanges: z.ZodOptional<z.ZodString>;
        competitiveChanges: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }, {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    companyName?: string | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    companyName?: string | undefined;
    representative?: string | undefined;
    foundedDate?: string | undefined;
    employees?: string | undefined;
    address?: string | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | undefined;
}>;
export type Competitor = z.infer<typeof CompetitorSchema>;
export type CompanyPosition = z.infer<typeof CompanyPositionSchema>;
export type CompetitorStrategy = z.infer<typeof CompetitorStrategySchema>;
export type IndustryPlayerCharacteristic = z.infer<typeof IndustryPlayerCharacteristicSchema>;
export type ExternalInternalAnalysis = z.infer<typeof ExternalInternalAnalysisSchema>;
export type MarketResearch = z.infer<typeof MarketResearchSchema>;
export type CompetitiveAdvantage = z.infer<typeof CompetitiveAdvantageSchema>;
export type FutureMarketOutlook = z.infer<typeof FutureMarketOutlookSchema>;
export type CompanyAnalysis = z.infer<typeof CompanyAnalysisSchema>;
export type CreateCompanyAnalysis = z.infer<typeof CreateCompanyAnalysisSchema>;
export type UpdateCompanyAnalysis = z.infer<typeof UpdateCompanyAnalysisSchema>;
//# sourceMappingURL=company-analysis.d.ts.map