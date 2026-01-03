import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const CompetitorSchema = z.object({
  id: IdSchema,
  no: z.number(),
  companyName: z.string(),
  sales: z.string().optional(),
  targetMarketSegment: z.string().optional(),
  competitiveAdvantagePoint: z.string().optional(),
});

export const CompanyPositionSchema = z.object({
  id: IdSchema,
  description: z.string(),
});

export const CompetitorStrategySchema = z.object({
  id: IdSchema,
  companyName: z.string(),
  pricePosition: z.enum(['low', 'medium', 'high']),
  valuePosition: z.enum(['low', 'medium', 'high']),
});

export const IndustryPlayerCharacteristicSchema = z.object({
  id: IdSchema,
  characteristic: z.string(),
});

export const ExternalInternalAnalysisSchema = z.object({
  id: IdSchema,
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  targetPosition: z.string().optional(),
});

export const MarketResearchSchema = z.object({
  id: IdSchema,
  marketMacro: z.string().optional(),
  marketSegment: z.string().optional(),
  customerCharacteristics: z.string().optional(),
});

export const CompetitiveAdvantageSchema = z.object({
  id: IdSchema,
  strategy: z.string().optional(),
  organization: z.string().optional(),
  system: z.string().optional(),
  technology: z.string().optional(),
  talent: z.string().optional(),
  values: z.string().optional(),
  competitiveAdvantageSource: z.string().optional(),
});

export const FutureMarketOutlookSchema = z.object({
  id: IdSchema,
  marketChanges: z.string().optional(),
  customerChanges: z.string().optional(),
  competitiveChanges: z.string().optional(),
});

export const CompetitorEvolutionSchema = z.object({
  id: IdSchema,
  category: z.enum(['established', 'newcomer']), // 古参/新参
  companyName: z.string(),
  characteristics: z.string().optional(),
});

export const MarketEvolutionSchema = z.object({
  id: IdSchema,
  period: z.string().optional(), // 時期
  marketTrend: z.string().optional(), // 市場動向
  featuresAndNeeds: z.string().optional(), // 特徴・ニーズ
});

export const TargetMarketSegmentSchema = z.object({
  id: IdSchema,
  segment: z.string(),
  description: z.string().optional(),
});

export const FoundingMemberSchema = z.object({
  id: IdSchema,
  name: z.string(),
  position: z.string().optional(),
  role: z.string().optional(),
});

export const MainProductSchema = z.object({
  id: IdSchema,
  productName: z.string(),
  description: z.string().optional(),
  launchDate: z.string().optional(), // ISO 8601 date string
});

export const CompanyHistorySchema = z.object({
  id: IdSchema,
  year: z.string(),
  event: z.string(),
  description: z.string().optional(),
});

export const OrganizationStructureSchema = z.object({
  id: IdSchema,
  structure: z.string().optional(),
  description: z.string().optional(),
});

export const HrEvaluationSystemSchema = z.object({
  id: IdSchema,
  system: z.string().optional(),
  description: z.string().optional(),
});

export const CorporateCultureSchema = z.object({
  id: IdSchema,
  culture: z.string().optional(),
  description: z.string().optional(),
});

export const CompanyAnalysisSchema = z.object({
  id: IdSchema,
  companyName: z.string(),
  representative: z.string().nullish(),
  foundedDate: z.string().nullish(), // ISO 8601 date string
  employees: z.string().nullish(),
  address: z.string().nullish(),
  competitors: z.array(CompetitorSchema).nullish(),
  companyPosition: CompanyPositionSchema.nullish(),
  competitorStrategies: z.array(CompetitorStrategySchema).nullish(),
  industryPlayerCharacteristics: z.array(IndustryPlayerCharacteristicSchema).nullish(),
  externalInternalAnalysis: ExternalInternalAnalysisSchema.nullish(),
  marketResearch: MarketResearchSchema.nullish(),
  competitiveAdvantage: CompetitiveAdvantageSchema.nullish(),
  futureMarketOutlook: FutureMarketOutlookSchema.nullish(),
  competitorEvolutions: z.array(CompetitorEvolutionSchema).nullish(),
  marketEvolutions: z.array(MarketEvolutionSchema).nullish(),
  targetMarketSegments: z.array(TargetMarketSegmentSchema).nullish(),
  foundingMembers: z.array(FoundingMemberSchema).nullish(),
  mainProducts: z.array(MainProductSchema).nullish(),
  companyHistories: z.array(CompanyHistorySchema).nullish(),
  organizationStructure: OrganizationStructureSchema.nullish(),
  hrEvaluationSystem: HrEvaluationSystemSchema.nullish(),
  corporateCulture: CorporateCultureSchema.nullish(),
  otherEpisodes: z.string().nullish(),
  notes: z.string().nullish(),
  comments: z.array(CommentSchema).nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateCompanyAnalysisSchema = CompanyAnalysisSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  comments: true,
});

export const UpdateCompanyAnalysisSchema = CreateCompanyAnalysisSchema.partial();

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
