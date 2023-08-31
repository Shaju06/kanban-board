import { useState } from 'react';

interface ModalProps {
  onClose: (value: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleModalWindow = (isCanceled: boolean) => {
    onClose(isCanceled ? '' : inputValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 modal-background">
      <div className="absolute inset-0  opacity-50"></div>
      <div className="bg-mainBgColor w-80 rounded-lg shadow-lg z-10">
        <div className="flex justify-end p-2">
          <button className="text-gray-600 hover:text-gray-800" onClick={() => handleModalWindow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-2">
          <input
            id="inputValue"
            type="text"
            className="flex-grow w-full bg-colBgColor h-10 rounded px-2 py-1 hover:border-rose-400 outline-none transition border border-transparent focus:border-rose-400"
            placeholder="Enter value..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full px-2 py-2 bg-mainBgColor flex justify-center">
          <button className="w-full hover:bg-colBgColor text-white font-semibold py-2 px-2 rounded" onClick={() => handleModalWindow(false)}>
            Add Container
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
