'use client';

import { useState } from "react";

interface TermHeaderProps {
  title: string;
  showFinishButton?: boolean;
  onFinish?: () => Promise<void>; // espera una función asíncrona
}

const TermHeader = ({ title, showFinishButton = false, onFinish }: TermHeaderProps) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="bg-gradient-to-l from-[#8684ea] to-[#39439f] h-20 flex items-center px-8 justify-between">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      {showFinishButton && (
        <>
          <button
            onClick={() => setConfirming(true)}
            className="text-sm font-medium bg-white text-[#39439f] px-4 py-2 rounded-lg hover:bg-[#f0f1ff] transition-colors hover:cursor-pointer"
          >
            Finalizar término
          </button>

          {confirming && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-4">
                  ¿Estás seguro?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Si cierras el término no podrás revertir este cambio.
                </p>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setConfirming(false)}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={async () => {
                      setConfirming(false);
                      await onFinish?.();
                    }}
                    className="px-4 py-2 text-sm bg-[#39439f] text-white rounded-lg hover:bg-[#2e336d] hover:cursor-pointer"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TermHeader;
