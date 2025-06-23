import { create } from 'zustand';

export type SearchQuery = {
    country: string | undefined;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: Number;
    bathrooms: Number;
    bedrooms: Number;
    category: string;
}

interface SearchModalStore {
    isOpen: boolean;
    step : string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
    reset: () => void;
}

const defaultQuery: SearchQuery = {
    country: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    bathrooms: 0,
    bedrooms: 0,
    category: '',
};

const useSearchModal = create<SearchModalStore>((set) =>({
    isOpen: false,
    step: '',
    open: (step) => set({isOpen: true , step: step}),
    close: () => set({isOpen: false}),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: { ...defaultQuery },
    reset: () => set({ query: { ...defaultQuery } }), 
}));

export default useSearchModal;