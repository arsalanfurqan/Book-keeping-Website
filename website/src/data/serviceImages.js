const images = {
  bookkeeping: [
    "bookkeeping.jpg",
    "Accounting documents and a calculator on a working desk",
  ],
  payroll: ["accounting-detail.jpg", "Reviewing records with a calculator"],
  "tax-support": [
    "bookkeeping.jpg",
    "Organized financial paperwork being reviewed",
  ],
  "financial-reporting": [
    "advisory.jpg",
    "Printed financial reports being discussed",
  ],
  "accounts-payable-receivable": [
    "accounting-detail.jpg",
    "Checking documents and calculations",
  ],
  "cfo-advisory": [
    "advisory.jpg",
    "A collaborative review of financial charts",
  ],
  "business-compliance": [
    "bookkeeping.jpg",
    "Business documents and organized folders",
  ],
  "budgeting-forecasting": [
    "advisory.jpg",
    "Charts and reports used in financial planning",
  ],
  "ecommerce-accounting": [
    "studio.jpg",
    "A laptop workspace for an online business",
  ],
  cleanup: ["bookkeeping.jpg", "Reviewing and organizing accounting paperwork"],
  "invoicing-support": [
    "workspace.jpg",
    "A notebook and laptop on a working desk",
  ],
  "management-reporting": [
    "advisory.jpg",
    "Business reports and financial charts",
  ],
};

export function serviceImage(slug) {
  const [file, alt] = images[slug] || images.bookkeeping;
  return { src: `/images/${file}`, alt };
}
