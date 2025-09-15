import { NextRequest, NextResponse } from 'next/server';
import { mockBlockchain } from '@/lib/mockBlockchain';

// Get all tokens or specific token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');

    if (tokenId) {
      const token = mockBlockchain.getToken(tokenId);
      const pool = mockBlockchain.getPool(tokenId);
      const transactions = mockBlockchain.getTransactions(tokenId);

      if (!token) {
        return NextResponse.json({ error: 'Token not found' }, { status: 404 });
      }

      return NextResponse.json({
        token,
        pool,
        transactions: transactions.slice(0, 10) // Last 10 transactions
      });
    }

    // Return all tokens
    const tokens = mockBlockchain.getAllTokens();
    return NextResponse.json({ tokens });

  } catch (error) {
    console.error('Token fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}

// Buy tokens
export async function POST(request: NextRequest) {
  try {
    const { tokenId, buyer, ethAmount } = await request.json();

    if (!tokenId || !buyer || !ethAmount) {
      return NextResponse.json({ 
        error: 'Missing required fields: tokenId, buyer, ethAmount' 
      }, { status: 400 });
    }

    const transaction = await mockBlockchain.buyTokens(tokenId, buyer, ethAmount);
    const updatedToken = mockBlockchain.getToken(tokenId);
    const updatedPool = mockBlockchain.getPool(tokenId);

    return NextResponse.json({
      success: true,
      transaction,
      token: updatedToken,
      pool: updatedPool,
      message: `Successfully purchased ${transaction.amount.toFixed(4)} tokens`
    });

  } catch (error) {
    console.error('Token purchase error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Purchase failed' 
    }, { status: 500 });
  }
}
