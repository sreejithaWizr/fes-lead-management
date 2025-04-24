// components/EditableFieldWrapper.jsx
import React, { useState } from 'react';
import EditIcon from '../assets/field-edit-icon.svg';
import SaveIcon from '../assets/field-save-icon.svg';
import CancelIcon from '../assets/field-edit-close-icon.svg';

const EditableFieldWrapper = ({ children, fieldName, value, onSave, onCancel }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cachedValue, setCachedValue] = useState(value);

    const handleEdit = () => {
        setCachedValue(value);
        setIsEditing(true);
    };

    const handleSave = () => {
        onSave(fieldName, cachedValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        onCancel(fieldName);
        setIsEditing(false);
    };

    return (
        <div className="form-field flex flex-row items-start min-w-0">
            {/* Input field section */}
            <div className="flex-grow min-w-0">
                {children(isEditing, cachedValue, setCachedValue)}
            </div>
            {/* Action icons */}
            <div className="flex-shrink-0 flex items-start mt-7 ml-1 space-x-1">
                {isEditing ? (
                    <>
                        <button type="button" onClick={handleSave}>
                            <img src={SaveIcon} className="w-4 h-4" alt="Save" />
                        </button>
                        <button type="button" onClick={handleCancel}>
                            <img src={CancelIcon} className="w-4 h-4" alt="Cancel" />
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={handleEdit} className="opacity-30 hover:opacity-100">
                        <img src={EditIcon} className="w-4 h-4" alt="Edit" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditableFieldWrapper;
