"use client";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateBooking() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();

    // ดึงข้อมูลจาก Query Parameters
    const shop = searchParams.get("shop");
    const existingItem = useAppSelector((state: any) =>
        state.bookSlice.bookItems.find((item: BookingItem) => item.shop === shop)
    );

    const [updatedData, setUpdatedData] = useState<BookingItem | null>(existingItem || null);

    const handleSaveUpdate = () => {
        if (updatedData) {
            dispatch(updateBooking(updatedData));
            router.push("/booking-list"); // กลับไปหน้ารายการจอง
        }
    };

    if (!existingItem) {
        return <div className="text-center text-red-500">Booking not found!</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Update Booking</h2>
            <input type="text" className="block my-2 p-2 border w-full"
                value={updatedData?.nameLastname || ""}
                onChange={(e) => setUpdatedData(prev => prev ? { ...prev, nameLastname: e.target.value } : null)}
            />
            <input type="text" className="block my-2 p-2 border w-full"
                value={updatedData?.tel || ""}
                onChange={(e) => setUpdatedData(prev => prev ? { ...prev, tel: e.target.value } : null)}
            />
            <input type="date" className="block my-2 p-2 border w-full"
                value={updatedData?.bookDate || ""}
                onChange={(e) => setUpdatedData(prev => prev ? { ...prev, bookDate: e.target.value } : null)}
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                onClick={handleSaveUpdate}>
                Save
            </button>
        </div>
    );
}
