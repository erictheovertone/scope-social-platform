// Privy App ID
export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmfggbvdy013fl50ba827mw47';

export const privyConfig = {
  // Configure login methods
  loginMethods: ['email', 'google', 'farcaster', 'twitter'] as ('email' | 'google' | 'farcaster' | 'twitter')[],
  
  // Appearance configuration to match Scope branding
  appearance: {
    theme: 'dark' as const,
    accentColor: '#ff0000' as `#${string}`,
    showWalletLoginFirst: false,
  },
  
  // Wallet configuration - auto-create wallets
  embeddedWallets: {
    createOnLogin: 'users-without-wallets' as const,
    requireUserPasswordOnCreate: false,
  },
  
  // Legal configuration
  legal: {
    termsAndConditionsUrl: 'https://scope.app/terms',
    privacyPolicyUrl: 'https://scope.app/privacy',
  },
};
