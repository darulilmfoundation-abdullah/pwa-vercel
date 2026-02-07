/**
 * Attendance Verification Popup Component
 * Displays important attendance verification message from System Admin
 */

class AttendanceVerificationPopup {
  constructor() {
    this.popupId = 'attendance-verification-popup';
    this.overlayId = 'popup-overlay';
    this.createPopupStyles();
  }

  createPopupStyles() {
    if (document.getElementById('popup-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'popup-styles';
    style.innerHTML = `
      #${this.overlayId} {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }

      #${this.popupId} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border-radius: 24px;
        padding: 0;
        max-width: 550px;
        width: 90%;
        max-height: 85vh;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        z-index: 10001;
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        display: none;
        border: 1px solid rgba(255, 255, 255, 0.8);
      }

      #${this.popupId}.show {
        display: flex;
        flex-direction: column;
      }

      #${this.overlayId}.show {
        display: block;
      }

      .popup-header {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        padding: 24px 32px;
        display: flex;
        align-items: center;
        gap: 16px;
        position: relative;
        overflow: hidden;
      }

      .popup-header::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(50%, -50%);
      }

      .popup-icon {
        width: 40px;
        height: 40px;
        color: white;
        flex-shrink: 0;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        position: relative;
        z-index: 1;
      }

      .popup-header h3 {
        margin: 0;
        font-size: 1.35rem;
        font-weight: 800;
        color: white;
        letter-spacing: -0.025em;
        position: relative;
        z-index: 1;
      }

      .popup-inner {
        padding: 32px;
        overflow-y: auto;
        flex: 1;
      }

      .popup-inner::-webkit-scrollbar {
        width: 6px;
      }

      .popup-inner::-webkit-scrollbar-track {
        background: transparent;
      }

      .popup-inner::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }

      .popup-inner::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }

      .popup-admin-note {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        border-left: 5px solid #dc2626;
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 24px;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
      }

      .popup-admin-note strong {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: #991b1b;
        font-size: 1rem;
      }

      .popup-admin-note p {
        margin: 0;
        color: #7f1d1d;
        font-size: 0.95rem;
        line-height: 1.6;
        font-weight: 500;
      }

      .popup-content {
        color: #1e293b;
        font-size: 0.98rem;
        line-height: 1.7;
        margin-bottom: 24px;
      }

      .popup-content p {
        margin: 0 0 16px 0;
        color: #475569;
      }

      .popup-content p strong {
        color: #1e293b;
        font-weight: 700;
      }

      .popup-content ul {
        margin: 16px 0;
        padding-left: 24px;
        background: #f1f5f9;
        padding: 16px 16px 16px 32px;
        border-radius: 12px;
        list-style: none;
      }

      .popup-content li {
        margin: 10px 0;
        color: #334155;
        position: relative;
        padding-left: 8px;
      }

      .popup-content li::before {
        content: '✓';
        position: absolute;
        left: -16px;
        color: #16a34a;
        font-weight: bold;
        font-size: 1.1rem;
      }

      .popup-urgent {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-left: 5px solid #f59e0b;
        padding: 14px 16px;
        border-radius: 10px;
        margin-bottom: 24px;
        color: #92400e;
        font-weight: 600;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .popup-urgent::before {
        content: '⏰';
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .popup-actions {
        display: flex;
        gap: 12px;
        padding: 24px 32px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
      }

      .popup-btn {
        flex: 1;
        padding: 13px 20px;
        border-radius: 12px;
        border: none;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        letter-spacing: 0.3px;
      }

      .popup-btn:active {
        transform: scale(0.98);
      }

      .popup-btn-primary {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
      }

      .popup-btn-primary:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        transform: translateY(-1px);
      }

      .popup-btn-secondary {
        background: #e2e8f0;
        color: #475569;
        border: 1px solid #cbd5e1;
      }

      .popup-btn-secondary:hover {
        background: #cbd5e1;
        color: #1e293b;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translate(-50%, -45%) scale(0.92);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @media (max-width: 640px) {
        #${this.popupId} {
          max-width: 95%;
          max-height: 90vh;
        }

        .popup-header {
          padding: 20px 24px;
        }

        .popup-header h3 {
          font-size: 1.15rem;
        }

        .popup-icon {
          width: 32px;
          height: 32px;
        }

        .popup-inner {
          padding: 24px;
        }

        .popup-actions {
          padding: 16px 24px;
          flex-direction: column;
          gap: 10px;
        }

        .popup-btn {
          width: 100%;
        }

        .popup-content ul {
          padding: 12px 12px 12px 28px;
        }

        .popup-content li {
          font-size: 0.9rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  show() {
    const popup = document.getElementById(this.popupId);
    const overlay = document.getElementById(this.overlayId);
    
    if (!popup) {
      this.create();
    }
    
    document.getElementById(this.popupId).classList.add('show');
    document.getElementById(this.overlayId).classList.add('show');
  }

  hide() {
    document.getElementById(this.popupId).classList.remove('show');
    document.getElementById(this.overlayId).classList.remove('show');
  }

  create() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = this.overlayId;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hide();
    });
    document.body.appendChild(overlay);

    // Popup Container
    const popup = document.createElement('div');
    popup.id = this.popupId;

    popup.innerHTML = `
      <div class="popup-header">
        <svg class="popup-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>Attendance Verification</h3>
      </div>

      <div class="popup-inner">
        <div class="popup-admin-note">
          <strong>📢 Important Message from System Admin</strong>
          <p>All incharges are requested to cross-check the attendance of their respective sections carefully.</p>
        </div>

        <div class="popup-content">
          <p><strong>Please verify the online attendance with manual records to ensure:</strong></p>
          <ul>
            <li>There are no missing entries</li>
            <li>There are no wrong or incorrect entries</li>
            <li>The data is accurate and complete</li>
          </ul>
          
          <p style="margin-top: 20px;"><strong style="color: #dc2626;">Why is this Important?</strong></p>
          <p>This verification is very important so that when the 100% attendance students list is generated from the system at the end of the session, there are no discrepancies or issues later.</p>

          <div class="popup-urgent">
            Please complete this checking process as soon as possible.
          </div>
        </div>
      </div>

      <div class="popup-actions">
        <button class="popup-btn popup-btn-secondary" onclick="attendancePopup.hide()">
          Dismiss
        </button>
        <button class="popup-btn popup-btn-primary" onclick="attendancePopup.hide()">
          Acknowledged
        </button>
      </div>
    `;

    document.body.appendChild(popup);
  }
}

// Initialize popup globally
const attendancePopup = new AttendanceVerificationPopup();
