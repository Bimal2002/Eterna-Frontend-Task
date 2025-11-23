import { Token } from "@/types/token";

type PriceUpdateCallback = (
  tokenId: string,
  newPrice: number,
  percentChange: number
) => void;

class WebSocketService {
  private callbacks: Set<PriceUpdateCallback> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];

  connect(tokens: Token[]) {
    this.tokens = tokens;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const updateCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < updateCount; i++) {
        this.updateRandomTokenPrice();
      }
    }, 1000);
  }

  private updateRandomTokenPrice() {
    if (this.tokens.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.tokens.length);
    const selectedToken = this.tokens[randomIndex];
    const priceChangePercent = (Math.random() - 0.5) * 15;
    const updatedPrice = selectedToken.price * (1 + priceChangePercent / 100);

    this.callbacks.forEach((callback) => {
      callback(selectedToken.id, updatedPrice, priceChangePercent);
    });
  }

  subscribe(callback: PriceUpdateCallback) {
    this.callbacks.add(callback);
  }

  unsubscribe(callback: PriceUpdateCallback) {
    this.callbacks.delete(callback);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.callbacks.clear();
  }
}

export const wsService = new WebSocketService();
