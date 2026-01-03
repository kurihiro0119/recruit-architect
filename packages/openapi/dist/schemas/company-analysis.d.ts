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
export declare const CompetitorEvolutionSchema: z.ZodObject<{
    id: z.ZodString;
    category: z.ZodEnum<["established", "newcomer"]>;
    companyName: z.ZodString;
    characteristics: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    companyName: string;
    category: "established" | "newcomer";
    characteristics?: string | undefined;
}, {
    id: string;
    companyName: string;
    category: "established" | "newcomer";
    characteristics?: string | undefined;
}>;
export declare const MarketEvolutionSchema: z.ZodObject<{
    id: z.ZodString;
    period: z.ZodOptional<z.ZodString>;
    marketTrend: z.ZodOptional<z.ZodString>;
    featuresAndNeeds: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    period?: string | undefined;
    marketTrend?: string | undefined;
    featuresAndNeeds?: string | undefined;
}, {
    id: string;
    period?: string | undefined;
    marketTrend?: string | undefined;
    featuresAndNeeds?: string | undefined;
}>;
export declare const TargetMarketSegmentSchema: z.ZodObject<{
    id: z.ZodString;
    segment: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    segment: string;
    description?: string | undefined;
}, {
    id: string;
    segment: string;
    description?: string | undefined;
}>;
export declare const FoundingMemberSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    position: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    position?: string | undefined;
    role?: string | undefined;
}, {
    id: string;
    name: string;
    position?: string | undefined;
    role?: string | undefined;
}>;
export declare const MainProductSchema: z.ZodObject<{
    id: z.ZodString;
    productName: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    launchDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    productName: string;
    description?: string | undefined;
    launchDate?: string | undefined;
}, {
    id: string;
    productName: string;
    description?: string | undefined;
    launchDate?: string | undefined;
}>;
export declare const CompanyHistorySchema: z.ZodObject<{
    id: z.ZodString;
    year: z.ZodString;
    event: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    year: string;
    event: string;
    description?: string | undefined;
}, {
    id: string;
    year: string;
    event: string;
    description?: string | undefined;
}>;
export declare const OrganizationStructureSchema: z.ZodObject<{
    id: z.ZodString;
    structure: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description?: string | undefined;
    structure?: string | undefined;
}, {
    id: string;
    description?: string | undefined;
    structure?: string | undefined;
}>;
export declare const HrEvaluationSystemSchema: z.ZodObject<{
    id: z.ZodString;
    system: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description?: string | undefined;
    system?: string | undefined;
}, {
    id: string;
    description?: string | undefined;
    system?: string | undefined;
}>;
export declare const CorporateCultureSchema: z.ZodObject<{
    id: z.ZodString;
    culture: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description?: string | undefined;
    culture?: string | undefined;
}, {
    id: string;
    description?: string | undefined;
    culture?: string | undefined;
}>;
export declare const CompanyAnalysisSchema: z.ZodObject<{
    id: z.ZodString;
    companyName: z.ZodString;
    representative: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    foundedDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    employees: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    competitors: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    companyPosition: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>>;
    competitorStrategies: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    industryPlayerCharacteristics: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>>;
    externalInternalAnalysis: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    marketResearch: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    competitiveAdvantage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    futureMarketOutlook: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    competitorEvolutions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        category: z.ZodEnum<["established", "newcomer"]>;
        companyName: z.ZodString;
        characteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }>, "many">>>;
    marketEvolutions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        period: z.ZodOptional<z.ZodString>;
        marketTrend: z.ZodOptional<z.ZodString>;
        featuresAndNeeds: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }>, "many">>>;
    targetMarketSegments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        segment: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        segment: string;
        description?: string | undefined;
    }, {
        id: string;
        segment: string;
        description?: string | undefined;
    }>, "many">>>;
    foundingMembers: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }>, "many">>>;
    mainProducts: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        launchDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }>, "many">>>;
    companyHistories: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        year: z.ZodString;
        event: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }>, "many">>>;
    organizationStructure: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        structure: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }>>>;
    hrEvaluationSystem: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        system: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }>>>;
    corporateCulture: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        culture: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }>>>;
    otherEpisodes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    companyName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | null | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    companyName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | null | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}>;
export declare const CreateCompanyAnalysisSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    companyName: z.ZodString;
    representative: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    foundedDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    employees: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    competitors: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    companyPosition: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>>;
    competitorStrategies: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    industryPlayerCharacteristics: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>>;
    externalInternalAnalysis: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    marketResearch: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    competitiveAdvantage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    futureMarketOutlook: z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    competitorEvolutions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        category: z.ZodEnum<["established", "newcomer"]>;
        companyName: z.ZodString;
        characteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }>, "many">>>;
    marketEvolutions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        period: z.ZodOptional<z.ZodString>;
        marketTrend: z.ZodOptional<z.ZodString>;
        featuresAndNeeds: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }>, "many">>>;
    targetMarketSegments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        segment: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        segment: string;
        description?: string | undefined;
    }, {
        id: string;
        segment: string;
        description?: string | undefined;
    }>, "many">>>;
    foundingMembers: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }>, "many">>>;
    mainProducts: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        launchDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }>, "many">>>;
    companyHistories: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        year: z.ZodString;
        event: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }>, "many">>>;
    organizationStructure: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        structure: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }>>>;
    hrEvaluationSystem: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        system: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }>>>;
    corporateCulture: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        culture: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }>>>;
    otherEpisodes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    companyName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}, {
    companyName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}>;
export declare const UpdateCompanyAnalysisSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    companyName: z.ZodOptional<z.ZodString>;
    representative: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    foundedDate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    employees: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    competitors: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>>;
    companyPosition: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>>>;
    competitorStrategies: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>>;
    industryPlayerCharacteristics: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        characteristic: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        characteristic: string;
    }, {
        id: string;
        characteristic: string;
    }>, "many">>>>;
    externalInternalAnalysis: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    }>>>>;
    marketResearch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    }>>>>;
    competitiveAdvantage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    }>>>>;
    futureMarketOutlook: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
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
    }>>>>;
    competitorEvolutions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        category: z.ZodEnum<["established", "newcomer"]>;
        companyName: z.ZodString;
        characteristics: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }, {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }>, "many">>>>;
    marketEvolutions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        period: z.ZodOptional<z.ZodString>;
        marketTrend: z.ZodOptional<z.ZodString>;
        featuresAndNeeds: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }, {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }>, "many">>>>;
    targetMarketSegments: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        segment: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        segment: string;
        description?: string | undefined;
    }, {
        id: string;
        segment: string;
        description?: string | undefined;
    }>, "many">>>>;
    foundingMembers: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        position: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }, {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }>, "many">>>>;
    mainProducts: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        launchDate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }, {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }>, "many">>>>;
    companyHistories: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        year: z.ZodString;
        event: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }, {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }>, "many">>>>;
    organizationStructure: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        structure: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    }>>>>;
    hrEvaluationSystem: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        system: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    }>>>>;
    corporateCulture: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        culture: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }, {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    }>>>>;
    otherEpisodes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    companyName?: string | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    companyName?: string | undefined;
    representative?: string | null | undefined;
    foundedDate?: string | null | undefined;
    employees?: string | null | undefined;
    address?: string | null | undefined;
    competitors?: {
        id: string;
        no: number;
        companyName: string;
        sales?: string | undefined;
        targetMarketSegment?: string | undefined;
        competitiveAdvantagePoint?: string | undefined;
    }[] | null | undefined;
    companyPosition?: {
        id: string;
        description: string;
    } | null | undefined;
    competitorStrategies?: {
        id: string;
        companyName: string;
        pricePosition: "low" | "medium" | "high";
        valuePosition: "low" | "medium" | "high";
    }[] | null | undefined;
    industryPlayerCharacteristics?: {
        id: string;
        characteristic: string;
    }[] | null | undefined;
    externalInternalAnalysis?: {
        id: string;
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
        targetPosition?: string | undefined;
    } | null | undefined;
    marketResearch?: {
        id: string;
        marketMacro?: string | undefined;
        marketSegment?: string | undefined;
        customerCharacteristics?: string | undefined;
    } | null | undefined;
    competitiveAdvantage?: {
        id: string;
        values?: string | undefined;
        strategy?: string | undefined;
        organization?: string | undefined;
        system?: string | undefined;
        technology?: string | undefined;
        talent?: string | undefined;
        competitiveAdvantageSource?: string | undefined;
    } | null | undefined;
    futureMarketOutlook?: {
        id: string;
        marketChanges?: string | undefined;
        customerChanges?: string | undefined;
        competitiveChanges?: string | undefined;
    } | null | undefined;
    competitorEvolutions?: {
        id: string;
        companyName: string;
        category: "established" | "newcomer";
        characteristics?: string | undefined;
    }[] | null | undefined;
    marketEvolutions?: {
        id: string;
        period?: string | undefined;
        marketTrend?: string | undefined;
        featuresAndNeeds?: string | undefined;
    }[] | null | undefined;
    targetMarketSegments?: {
        id: string;
        segment: string;
        description?: string | undefined;
    }[] | null | undefined;
    foundingMembers?: {
        id: string;
        name: string;
        position?: string | undefined;
        role?: string | undefined;
    }[] | null | undefined;
    mainProducts?: {
        id: string;
        productName: string;
        description?: string | undefined;
        launchDate?: string | undefined;
    }[] | null | undefined;
    companyHistories?: {
        id: string;
        year: string;
        event: string;
        description?: string | undefined;
    }[] | null | undefined;
    organizationStructure?: {
        id: string;
        description?: string | undefined;
        structure?: string | undefined;
    } | null | undefined;
    hrEvaluationSystem?: {
        id: string;
        description?: string | undefined;
        system?: string | undefined;
    } | null | undefined;
    corporateCulture?: {
        id: string;
        description?: string | undefined;
        culture?: string | undefined;
    } | null | undefined;
    otherEpisodes?: string | null | undefined;
}>;
export type Competitor = z.infer<typeof CompetitorSchema>;
export type CompanyPosition = z.infer<typeof CompanyPositionSchema>;
export type CompetitorStrategy = z.infer<typeof CompetitorStrategySchema>;
export type IndustryPlayerCharacteristic = z.infer<typeof IndustryPlayerCharacteristicSchema>;
export type ExternalInternalAnalysis = z.infer<typeof ExternalInternalAnalysisSchema>;
export type MarketResearch = z.infer<typeof MarketResearchSchema>;
export type CompetitiveAdvantage = z.infer<typeof CompetitiveAdvantageSchema>;
export type FutureMarketOutlook = z.infer<typeof FutureMarketOutlookSchema>;
export type CompetitorEvolution = z.infer<typeof CompetitorEvolutionSchema>;
export type MarketEvolution = z.infer<typeof MarketEvolutionSchema>;
export type TargetMarketSegment = z.infer<typeof TargetMarketSegmentSchema>;
export type FoundingMember = z.infer<typeof FoundingMemberSchema>;
export type MainProduct = z.infer<typeof MainProductSchema>;
export type CompanyHistory = z.infer<typeof CompanyHistorySchema>;
export type OrganizationStructure = z.infer<typeof OrganizationStructureSchema>;
export type HrEvaluationSystem = z.infer<typeof HrEvaluationSystemSchema>;
export type CorporateCulture = z.infer<typeof CorporateCultureSchema>;
export type CompanyAnalysis = z.infer<typeof CompanyAnalysisSchema>;
export type CreateCompanyAnalysis = z.infer<typeof CreateCompanyAnalysisSchema>;
export type UpdateCompanyAnalysis = z.infer<typeof UpdateCompanyAnalysisSchema>;
//# sourceMappingURL=company-analysis.d.ts.map