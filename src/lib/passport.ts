export type PassportTier = 'New' | 'Building' | 'Trusted' | 'Strong'
export type PassportProfile = { onTimeRatio:number; averageDays:number; clearedEntries:number; monthsHistory:number }
export type PassportScore = PassportProfile & { score:number; tier:PassportTier; explanation:string }
export function scorePassport(profile: PassportProfile): PassportScore {
  const ratio = Math.round(profile.onTimeRatio * 100)
  const score = Math.round(profile.onTimeRatio * 45 + Math.max(0, 30 - profile.averageDays) / 30 * 25 + Math.min(profile.clearedEntries, 12) / 12 * 20 + Math.min(profile.monthsHistory, 12) / 12 * 10)
  const tier: PassportTier = score >= 80 && ratio >= 85 ? 'Strong' : score >= 60 && ratio >= 70 ? 'Trusted' : score >= 35 ? 'Building' : 'New'
  const explanation = tier === 'Strong' ? `You repay on time (${ratio}%), clear ${profile.clearedEntries} entries, and have built ${profile.monthsHistory} months of history.` : tier === 'Trusted' ? `Your repayment pattern is dependable: ${ratio}% on time, with an average of ${profile.averageDays} days to repay.` : tier === 'Building' ? `You are building trust. Keep clearing dues on time to move up from ${ratio}% on-time repayment.` : 'Your passport is just getting started. Confirm and clear a few dues to build a track record.'
  return { ...profile, score, tier, explanation }
}
export const demoProfile = scorePassport({ onTimeRatio: .88, averageDays: 11, clearedEntries: 8, monthsHistory: 7 })
