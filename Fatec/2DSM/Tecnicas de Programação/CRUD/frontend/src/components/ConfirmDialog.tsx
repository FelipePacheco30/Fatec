import React from 'react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmDialog: React.FC<Props> = ({ onConfirm, onCancel, message = 'Tem certeza que deseja excluir este usuário?' }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className="modal modal-delete" onClick={handleOverlayClick} role="presentation">
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">Confirmar exclusão</h2>
        <p>{message}</p>

        <div className="button-group">
          <button className="cancel" onClick={onCancel}>Não</button>
          <button className="confirm" onClick={onConfirm}>Sim, excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
