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

export const CompanyAnalysisSchema = z.object({
  id: IdSchema,
  companyName: z.string(),
  representative: z.string().optional(),
  foundedDate: z.string().optional(),
  employees: z.string().optional(),
  address: z.string().optional(),
  competitors: z.array(CompetitorSchema).optional(),
  companyPosition: CompanyPositionSchema.optional(),
  competitorStrategies: z.array(CompetitorStrategySchema).optional(),
  industryPlayerCharacteristics: z.array(IndustryPlayerCharacteristicSchema).optional(),
  externalInternalAnalysis: ExternalInternalAnalysisSchema.optional(),
  marketResearch: MarketResearchSchema.optional(),
  competitiveAdvantage: CompetitiveAdvantageSchema.optional(),
  futureMarketOutlook: FutureMarketOutlookSchema.optional(),
  notes: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
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
export type CompanyAnalysis = z.infer<typeof CompanyAnalysisSchema>;
export type CreateCompanyAnalysis = z.infer<typeof CreateCompanyAnalysisSchema>;
export type UpdateCompanyAnalysis = z.infer<typeof UpdateCompanyAnalysisSchema>;
