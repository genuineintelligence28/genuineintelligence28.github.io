// hacker ki ma ki chu*
const GOOGLE_FORM_URL = "https://forms.gle/8THxUvGASDtBHQFJ8";

// UPI Deep Link Config
const UPI_BASE = {
  pa: 'a.khan.130@superyes',
  pn: 'Genuine Intelligence 28',
  am: '10',
  cu: 'INR',
  tn: '100 Followers @ ₹10'
};

const qs = (s, el = document) => el.querySelector(s);

function buildUpiDeepLink({ pa, pn, am, cu, tn }) {
  const params = new URLSearchParams({ pa, pn, am, cu, tn });
  return `upi://pay?${params.toString()}`;
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  const iPaidBtn = qs('#iPaidBtn');
  const upiPayBtn = qs('#upiPayBtn');
  const noticeEl = qs('.card .notice');

  // UPI Payment Logic
  if (upiPayBtn) {
    upiPayBtn.addEventListener('click', e => {
      e.preventDefault();
      const upiLink = buildUpiDeepLink(UPI_BASE);
      window.location.href = upiLink;
    });
  }

  // "I have paid" button opens Google Form in a new tab
  if (iPaidBtn) {
    iPaidBtn.addEventListener('click', () => {
      if (noticeEl) {
        noticeEl.textContent = 'Great! Please fill the form that just opened to complete your order.';
        noticeEl.style.borderColor = '#4ade80'; // Green color for success
      }
      
      // Open the Google Form in a new tab
      window.open(GOOGLE_FORM_URL, '_blank');
    });
  }
});