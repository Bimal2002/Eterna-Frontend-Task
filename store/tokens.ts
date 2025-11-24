import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, SortField, SortDirection } from "@/types/token";

// Redux state shape for token management
interface TokenState {
  tokens: Token[]; // All tokens
  filteredTokens: Token[]; // Tokens after filtering
  selectedCategory: "all" | "new" | "final" | "migrated";
  sortField: SortField | null;
  sortDirection: SortDirection;
  searchQuery: string; // Search query for filtering tokens
  isLoading: boolean;
  error: string | null;
}

// Initial state values
const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  selectedCategory: "all",
  sortField: null,
  sortDirection: "desc",
  searchQuery: "",
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    // Set all tokens at once (initial load)
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.filteredTokens = action.payload;
    },
    // Update single token price (WebSocket update)
    updateTokenPrice: (
      state,
      action: PayloadAction<{ tokenId: string; price: number; change: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.tokenId);
      if (token) {
        token.price = action.payload.price;
        token.priceChange24h = action.payload.change;
      }
    },
    // Filter tokens by category
    setCategory: (
      state,
      action: PayloadAction<TokenState["selectedCategory"]>
    ) => {
      state.selectedCategory = action.payload;
      state.filteredTokens =
        action.payload === "all"
          ? state.tokens
          : state.tokens.filter((t) => t.category === action.payload);
    },
    // Update sorting preferences
    setSorting: (
      state,
      action: PayloadAction<{ field: SortField; direction: SortDirection }>
    ) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    // Toggle loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Set search query and filter tokens
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase().trim();
      
      // Filter tokens by search query and category
      let filtered = state.tokens;
      
      // Apply search filter if query exists
      if (query) {
        filtered = filtered.filter(
          (token) =>
            token.name.toLowerCase().includes(query) ||
            token.symbol.toLowerCase().includes(query) ||
            token.id.toLowerCase().includes(query)
        );
      }
      
      // Apply category filter
      if (state.selectedCategory !== "all") {
        filtered = filtered.filter((t) => t.category === state.selectedCategory);
      }
      
      state.filteredTokens = filtered;
    },
  },
});

export const {
  setTokens,
  updateTokenPrice,
  setCategory,
  setSorting,
  setLoading,
  setError,
  setSearchQuery,
} = tokenSlice.actions;

export default tokenSlice.reducer;
