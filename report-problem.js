/**
 * Report Problem Component
 * Floating button in footer to report issues
 */

class ReportProblem {
  constructor() {
    this.popupId = 'report-problem-popup';
    this.overlayId = 'report-overlay';
    this.buttonId = 'report-problem-btn';
    this.createStyles();
    this.create();
  }

  createStyles() {
    if (document.getElementById('report-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'report-styles';
    style.innerHTML = `
      #${this.buttonId} {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 5000;
        font-size: 24px;
        line-height: 1;
      }

      #${this.buttonId}:hover {
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
      }

      #${this.buttonId}:active {
        transform: scale(0.95);
      }

      @media (max-width: 640px) {
        #${this.buttonId} {
          width: 50px;
          height: 50px;
          bottom: 16px;
          right: 16px;
        }
      }

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
        max-width: 500px;
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

      .report-header {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        padding: 24px 32px;
        display: flex;
        align-items: center;
        gap: 16px;
        position: relative;
        overflow: hidden;
      }

      .report-header::before {
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

      .report-icon {
        width: 40px;
        height: 40px;
        color: white;
        flex-shrink: 0;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        position: relative;
        z-index: 1;
      }

      .report-header h3 {
        margin: 0;
        font-size: 1.35rem;
        font-weight: 800;
        color: white;
        letter-spacing: -0.025em;
        position: relative;
        z-index: 1;
      }

      .report-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 2;
        font-size: 20px;
        line-height: 1;
      }

      .report-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .report-inner {
        padding: 32px;
        overflow-y: auto;
        flex: 1;
      }

      .report-inner::-webkit-scrollbar {
        width: 6px;
      }

      .report-inner::-webkit-scrollbar-track {
        background: transparent;
      }

      .report-inner::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }

      .report-inner::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }

      .form-group {
        margin-bottom: 24px;
      }

      .form-group label {
        display: block;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 8px;
        font-size: 0.95rem;
      }

      .form-group input,
      .form-group textarea,
      .form-group select {
        width: 100%;
        padding: 12px 14px;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        color: #1e293b;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }

      .form-group input:focus,
      .form-group textarea:focus,
      .form-group select:focus {
        outline: none;
        border-color: #f59e0b;
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
      }

      .form-group textarea {
        resize: vertical;
        min-height: 100px;
        font-family: 'Inter', sans-serif;
      }

      .form-help {
        font-size: 0.8rem;
        color: #64748b;
        margin-top: 4px;
      }

      .report-actions {
        display: flex;
        gap: 12px;
        padding: 24px 32px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
      }

      .report-btn {
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

      .report-btn:active {
        transform: scale(0.98);
      }

      .report-btn-primary {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
      }

      .report-btn-primary:hover {
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
        transform: translateY(-1px);
      }

      .report-btn-secondary {
        background: #e2e8f0;
        color: #475569;
        border: 1px solid #cbd5e1;
      }

      .report-btn-secondary:hover {
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

        .report-header {
          padding: 20px 24px;
        }

        .report-header h3 {
          font-size: 1.15rem;
        }

        .report-icon {
          width: 32px;
          height: 32px;
        }

        .report-inner {
          padding: 24px;
        }

        .report-actions {
          padding: 16px 24px;
          flex-direction: column;
          gap: 10px;
        }

        .report-btn {
          width: 100%;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  show() {
    document.getElementById(this.popupId).classList.add('show');
    document.getElementById(this.overlayId).classList.add('show');
  }

  hide() {
    document.getElementById(this.popupId).classList.remove('show');
    document.getElementById(this.overlayId).classList.remove('show');
  }

  create() {
    // Button
    const button = document.createElement('button');
    button.id = this.buttonId;
    button.title = 'Report a Problem';
    button.innerHTML = '⚠️';
    button.addEventListener('click', () => this.show());
    document.body.appendChild(button);

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = this.overlayId;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hide();
    });
    document.body.appendChild(overlay);

    // Popup
    const popup = document.createElement('div');
    popup.id = this.popupId;
    popup.innerHTML = `
      <div class="report-header">
        <svg class="report-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
        <h3>Report a Problem</h3>
        <button class="report-close" onclick="reportProblem.hide()">×</button>
      </div>

      <div class="report-inner">
        <form id="reportForm">
          <div class="form-group">
            <label for="reportType">Issue Type *</label>
            <select id="reportType" required>
              <option value="">Select an issue type</option>
              <option value="login">Login Issue</option>
              <option value="attendance">Attendance Problem</option>
              <option value="data">Data Entry Issue</option>
              <option value="sync">Sync/Update Problem</option>
              <option value="performance">Performance Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="reportTitle">Subject *</label>
            <input type="text" id="reportTitle" placeholder="Brief description of the issue" required>
          </div>

          <div class="form-group">
            <label for="reportUsername">Your Username *</label>
            <input type="text" id="reportUsername" placeholder="Enter your username" required>
            <div class="form-help">Your username will help us identify your account</div>
          </div>

          <div class="form-group">
            <label for="reportDesc">Description *</label>
            <textarea id="reportDesc" placeholder="Please provide detailed information about the problem..." required></textarea>
            <div class="form-help">Include any error messages or steps to reproduce</div>
          </div>

          <div class="form-group">
            <label for="reportSeverity">Severity</label>
            <select id="reportSeverity">
              <option value="low">Low - Minor inconvenience</option>
              <option value="medium">Medium - Important but workaround available</option>
              <option value="high">High - Blocks my work</option>
              <option value="critical">Critical - System unusable</option>
            </select>
          </div>
        </form>
      </div>

      <div class="report-actions">
        <button class="report-btn report-btn-secondary" onclick="reportProblem.hide()">
          Cancel
        </button>
        <button class="report-btn report-btn-primary" onclick="reportProblem.submitReport()">
          Submit Report
        </button>
      </div>
    `;
    document.body.appendChild(popup);
  }

  submitReport() {
    const form = document.getElementById('reportForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const reportData = {
      type: document.getElementById('reportType').value,
      title: document.getElementById('reportTitle').value,
      username: document.getElementById('reportUsername').value,
      description: document.getElementById('reportDesc').value,
      severity: document.getElementById('reportSeverity').value,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Log to console (you can replace this with actual API call)
    console.log('Report submitted:', reportData);

    // Show success message
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Sent Successfully! ✓';
    btn.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      this.hide();
      form.reset();
    }, 2000);

    // Optional: Send to backend
    // fetch('/api/report', { method: 'POST', body: JSON.stringify(reportData) })
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.reportProblem = new ReportProblem();
});
