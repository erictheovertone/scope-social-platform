// Mock blockchain integration for testing tokenization and liquidity mechanics

export interface MockToken {
  tokenId: string;
  postId: string;
  contractAddress: string; // Mock ERC-1155 contract
  creator: string;
  supply: number;
  price: number; // In ETH
  marketCap: number;
  holders: number;
  createdAt: string;
}

export interface MockLiquidityPool {
  tokenId: string;
  ethReserve: number;
  tokenReserve: number;
  totalLiquidity: number;
  pricePerToken: number;
}

export interface MockTransaction {
  id: string;
  type: 'mint' | 'buy' | 'sell' | 'liquidity_add';
  tokenId: string;
  amount: number;
  price: number;
  user: string;
  timestamp: string;
  fee: number; // 3% as per PRD
}

// In-memory storage for testing
let mockTokens: MockToken[] = [];
let mockPools: MockLiquidityPool[] = [];
let mockTransactions: MockTransaction[] = [];

export const mockBlockchain = {
  // Auto-mint token when post is created (ERC-1155 style)
  async mintPostToken(postId: string, creator: string, initialSupply: number = 1000): Promise<MockToken> {
    const tokenId = `token_${postId}`;
    const initialPrice = 0.001; // Starting price in ETH
    
    const token: MockToken = {
      tokenId,
      postId,
      contractAddress: '0x1234567890123456789012345678901234567890', // Mock contract
      creator,
      supply: initialSupply,
      price: initialPrice,
      marketCap: initialPrice * initialSupply,
      holders: 1, // Creator starts as holder
      createdAt: new Date().toISOString()
    };

    mockTokens.push(token);

    // Create initial liquidity pool
    const pool: MockLiquidityPool = {
      tokenId,
      ethReserve: 0.1, // Initial ETH liquidity
      tokenReserve: initialSupply * 0.5, // 50% of tokens in pool
      totalLiquidity: Math.sqrt(0.1 * (initialSupply * 0.5)),
      pricePerToken: initialPrice
    };

    mockPools.push(pool);

    // Record mint transaction
    const mintTx: MockTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'mint',
      tokenId,
      amount: initialSupply,
      price: initialPrice,
      user: creator,
      timestamp: new Date().toISOString(),
      fee: 0 // No fee for minting
    };

    mockTransactions.push(mintTx);

    return token;
  },

  // Buy tokens (collectors purchasing)
  async buyTokens(tokenId: string, buyer: string, ethAmount: number): Promise<MockTransaction> {
    const pool = mockPools.find(p => p.tokenId === tokenId);
    const token = mockTokens.find(t => t.tokenId === tokenId);
    
    if (!pool || !token) {
      throw new Error('Token or pool not found');
    }

    // Calculate tokens received using constant product formula (x * y = k)
    const fee = ethAmount * 0.03; // 3% transaction fee
    const ethAfterFee = ethAmount - fee;
    const tokensOut = (pool.tokenReserve * ethAfterFee) / (pool.ethReserve + ethAfterFee);

    // Update pool reserves
    pool.ethReserve += ethAfterFee;
    pool.tokenReserve -= tokensOut;
    pool.pricePerToken = pool.ethReserve / pool.tokenReserve;

    // Update token data
    token.price = pool.pricePerToken;
    token.marketCap = token.price * token.supply;
    token.holders += 1;

    const buyTx: MockTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'buy',
      tokenId,
      amount: tokensOut,
      price: pool.pricePerToken,
      user: buyer,
      timestamp: new Date().toISOString(),
      fee
    };

    mockTransactions.push(buyTx);

    return buyTx;
  },

  // Get token data
  getToken(tokenId: string): MockToken | undefined {
    return mockTokens.find(t => t.tokenId === tokenId);
  },

  // Get all tokens
  getAllTokens(): MockToken[] {
    return mockTokens.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Get liquidity pool
  getPool(tokenId: string): MockLiquidityPool | undefined {
    return mockPools.find(p => p.tokenId === tokenId);
  },

  // Get transaction history
  getTransactions(tokenId?: string): MockTransaction[] {
    const txs = tokenId 
      ? mockTransactions.filter(tx => tx.tokenId === tokenId)
      : mockTransactions;
    
    return txs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // Calculate current token price
  getCurrentPrice(tokenId: string): number {
    const pool = mockPools.find(p => p.tokenId === tokenId);
    return pool ? pool.pricePerToken : 0;
  },

  // Simulate price discovery and market activity
  simulateMarketActivity(): void {
    mockPools.forEach(pool => {
      // Add some random market movement
      const priceChange = (Math.random() - 0.5) * 0.1; // ±10% random change
      pool.pricePerToken *= (1 + priceChange);
      
      // Update corresponding token
      const token = mockTokens.find(t => t.tokenId === pool.tokenId);
      if (token) {
        token.price = pool.pricePerToken;
        token.marketCap = token.price * token.supply;
      }
    });
  },

  // Clear all data (for testing)
  clearAll(): void {
    mockTokens = [];
    mockPools = [];
    mockTransactions = [];
  }
};
