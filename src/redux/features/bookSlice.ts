import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingItem = {
    shop: string;
    nameLastname: string;
    tel: string;
    bookDate: string;
    details?: string;
};

type BookState = {
    bookItems: BookingItem[];
    errorMessage: string | null;
};

const initialState: BookState = { bookItems: [], errorMessage: null };

export const bookSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const isDuplicate = state.bookItems.some(
                obj => obj.shop === action.payload.shop && obj.bookDate === action.payload.bookDate
            );

            if (isDuplicate) {
                state.errorMessage = `This time slot at ${action.payload.shop} is already booked! Please select another time.`;
            } else {
                state.bookItems.push(action.payload);
                state.errorMessage = null;
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(obj => 
                obj.shop !== action.payload.shop || obj.nameLastname !== action.payload.nameLastname
            );
        },
        updateBooking: (state, action: PayloadAction<BookingItem>) => {
            const isDuplicate = state.bookItems.some(
                obj => obj.shop === action.payload.shop && obj.bookDate === action.payload.bookDate && obj.nameLastname !== action.payload.nameLastname
            );

            if (isDuplicate) {
                state.errorMessage = `This time slot at ${action.payload.shop} is already booked! Please select another time.`;
            } else {
                const index = state.bookItems.findIndex(obj => 
                    obj.shop === action.payload.shop && obj.nameLastname === action.payload.nameLastname
                );
                if (index !== -1) {
                    state.bookItems[index] = action.payload;
                    state.errorMessage = null;
                }
            }
        },
        clearError: (state) => {
            state.errorMessage = null;
        }
    }
});

export const { addBooking, removeBooking, updateBooking, clearError } = bookSlice.actions;
export default bookSlice.reducer;
