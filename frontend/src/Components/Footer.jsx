import React from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-[#d8eefe] to-[#e1f3fd] text-gray-800">
      {/* Top Footer Info */}
      <div className="max-padd-container py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-gray-300">
        {/* Help Section */}
        <div>
          <h4 className="text-xl font-semibold mb-2">{t('footer.help')}</h4>
          <p className="text-sm text-gray-700">{t('footer.fashion_description')}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <FaLocationDot size={20} />
            <div>
              <h5 className="font-medium">{t('footer.location')}</h5>
              <p className="text-sm text-gray-700">{t('footer.location_details')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhone size={20} />
            <div>
              <h5 className="font-medium">{t('footer.phone')}</h5>
              <p className="text-sm text-gray-700">{t('footer.phone_details')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMailBulk size={20} />
            <div>
              <h5 className="font-medium">{t('footer.email_support')}</h5>
              <p className="text-sm text-gray-700">{t('footer.email_details')}</p>
            </div>
          </div>
        </div>

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold">{t('footer.vsa')}</h2>
          <p className="mt-2 text-sm text-gray-700">{t('footer.fashion_overview')}</p>
        </div>
      </div>

      {/* Bottom Footer Sections */}
      <div className="max-padd-container py-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-3">{t('footer.customer_service')}</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>{t('footer.help_center')}</li>
            <li>{t('footer.payment_methods')}</li>
            <li>{t('footer.contact')}</li>
            <li>{t('footer.shipping_status')}</li>
            <li>{t('footer.complaints')}</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-3">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>{t('footer.privacy_policy')}</li>
            <li>{t('footer.cookie_settings')}</li>
            <li>{t('footer.terms_conditions')}</li>
            <li>{t('footer.cancellation')}</li>
            <li>{t('footer.imprint')}</li>
          </ul>
        </div>

        {/* Others */}
        <div>
          <h4 className="text-lg font-semibold mb-3">{t('footer.others')}</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>{t('footer.our_teams')}</li>
            <li>{t('footer.sustainability')}</li>
            <li>{t('footer.press')}</li>
            <li>{t('footer.jobs')}</li>
            <li>{t('footer.newsletter')}</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-padd-container border-t border-gray-300 py-4 text-sm flex justify-between items-center text-gray-600">
        <span>© 2025 {t('footer.vsa')}</span>
        <span>{t('footer.rights_reserved')}</span>
      </div>
    </footer>
  );
};

export default Footer;


