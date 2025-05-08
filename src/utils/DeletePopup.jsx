import React from 'react';
import { createPortal } from 'react-dom';
import { CustomButton } from 'react-mui-tailwind';

const DeletePopup = ({ onClose, onConfirm, title = "Are you sure you want to delete this item?" }) => {
    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div
                className="bg-white rounded-3xl p-[34px] flex flex-col items-center gap-[24px]"
                style={{ width: 'auto', height: 'auto' }}
            >
                <p className="text-center text-neutral-500 text-[16px] font-medium">
                    {title}
                </p>
                <div className="flex gap-[8px]">
                    <CustomButton
                        text="Yes"
                        startIcon={false}
                        endIcon={false}
                        width="auto"
                        onClick={onConfirm}
                    />
                    <CustomButton
                        text="No"
                        variant="secondary"
                        startIcon={false}
                        endIcon={false}
                        width="auto"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeletePopup;
