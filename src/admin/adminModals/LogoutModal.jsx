import { LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { logOutAdmin } from "../../Redux/features/auth/authThunk";

const LogoutModal = ({ onClose }) => {

    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.auth
    );

    const handleLogout = async () => {

        if (loading) {
            return;
        }

        const result = await dispatch(
            logOutAdmin()
        );

        if (result.success) {
            onClose();
        }
    };

    return (
        <div className="w-full">

            <div className="mt-4 text-center">

                <div
                    className="
                        mx-auto
                        mb-4
                        w-12
                        h-12
                        rounded-full
                        bg-red-50
                        flex
                        items-center
                        justify-center
                    "
                >
                    <LogOut
                        size={22}
                        className="text-red-600"
                    />
                </div>

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-slate-800
                    "
                >
                    Logout Account
                </h2>

                <p
                    className="
                        text-sm
                        text-slate-500
                        mt-1
                        leading-relaxed
                    "
                >
                    Are you sure you want to logout
                    from your account?
                </p>

            </div>

            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    mt-6
                "
            >

                {/* CANCEL */}

                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="
                        h-11
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        hover:bg-slate-50
                        disabled:opacity-50
                        text-sm
                        font-medium
                        text-slate-700
                        transition-all
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <X size={16} />
                    Cancel
                </button>


                {/* LOGOUT */}

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="
                        h-11
                        rounded-xl
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-red-400
                        text-white
                        text-sm
                        font-semibold
                        transition-all
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >

                    {loading ? (
                        <>
                            <span
                                className="
                                    w-4
                                    h-4
                                    border-2
                                    border-white/40
                                    border-t-white
                                    rounded-full
                                    animate-spin
                                "
                            />

                            Logging out...
                        </>
                    ) : (
                        <>
                            <LogOut size={16} />

                            Logout
                        </>
                    )}

                </button>

            </div>

        </div>
    );
};

export default LogoutModal;