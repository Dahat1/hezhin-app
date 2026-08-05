'use client';

import Image from 'next/image';
import { Heart, Languages, MessageCircle, Sparkles, Zap, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { StoreButtons } from './StoreButtons';
import { useSitePreferences } from './SitePreferences';
import { siteUrl } from '../lib/site';

const copy = {
  en: {
    eyebrow: 'WELCOME TO HEZHIN', title: 'Hezhin, Inspired by Elegance.',
    lead: 'Discover new arrivals, explore every detail, save favorites, and order directly from Hezhin through WhatsApp.',
    official: 'Official Hezhin website', languages: 'English, Kurdish & Arabic',
    browse: 'Browse collections', browseBody: 'Explore products, prices, photos, videos, new arrivals and sale pieces.',
    favorite: 'Save favorites', favoriteBody: 'Keep the products you love together and return to them whenever you want.',
    contact: 'Order with confidence', contactBody: 'Open WhatsApp directly from any product page for inquiries and ordering.',
    aboutEyebrow: 'DESIGNED FOR HEZHIN CUSTOMERS', aboutTitle: 'A simpler way to discover every collection.',
    aboutBody: 'Hezhin brings a growing boutique catalog into one fast, elegant experience. Browse by category, check prices and stock, and contact the boutique without complicated checkout steps.',
    step1: 'Find your style', step2: 'Save what you love', step3: 'Contact Hezhin',
    fast: 'Exclusive Collections', fastBody: 'Discover selections available only at Hezhin.',
    language: 'New Arrivals', languageBody: 'Be among the first to discover our latest products.',
    trusted: 'Easy Shopping', trustedBody: 'Discover, choose, and contact us in just a few moments.',
    downloadEyebrow: 'DOWNLOAD', downloadTitle: 'Hezhin is ready for your phone',
    downloadBody: 'Scan the QR code or choose your store. Mobile visitors are sent to the correct store automatically.',
    scan: 'Scan to download', phoneTitle: 'Latest collections', phoneSubtitle: 'New arrivals selected for you',
  },
  ku: {
    eyebrow: 'بەخێربێیت بۆ هێژین', title: 'هێژین، ئیلهام لە جوانی',
    lead: 'تازەگەیشتووەکان ببینە، هەموو وردەکارییەکان بزانە، دڵخوازەکانت هەڵبگرە و بە واتسئاپ ڕاستەوخۆ لە هێژین داواکاری بکە.',
    official: 'وێبسایتی فەرمی هێژین', languages: 'ئینگلیزی، کوردی و عەرەبی',
    browse: 'کۆڵێکشنەکان ببینە', browseBody: 'بەرهەم، نرخ، وێنە، ڤیدیۆ، تازەگەیشتوو و داشکاندنەکان ببینە.',
    favorite: 'دڵخوازەکان هەڵبگرە', favoriteBody: 'ئەو بەرهەمانەی حەزت لێیانە لە یەک شوێن هەڵبگرە و لە هەر کاتێک بگەڕێوە بۆیان.',
    contact: 'بە متمانە داواکاری بکە', contactBody: 'لە هەر بەرهەمێکەوە بە واتسئاپ بۆ زانیاری و داواکاری پەیوەندی بکە.',
    aboutEyebrow: 'بۆ کڕیارانی هێژین دروستکراوە', aboutTitle: 'ڕێگایەکی ئاسانتر بۆ دۆزینەوەی هەموو کۆڵێکشنەکان.',
    aboutBody: 'هێژین کاتەلۆگێکی گەورەی بوتیک لە ئەزموونێکی خێرا و جواندا کۆدەکاتەوە. بە پۆل بگەڕێ، نرخ و ستۆک ببینە و بە سادەیی پەیوەندی بکە.',
    step1: 'ستایلی خۆت بدۆزەوە', step2: 'دڵخوازەکانت هەڵبگرە', step3: 'پەیوەندی بە هێژین بکە',
    fast: 'کۆڵێکشنی تایبەت', fastBody: 'تەنها ئەو هەڵبژاردنانە ببینە کە لە هێژین بەردەستن.',
    language: 'تازەگەیشتوو', languageBody: 'هەمیشە یەکەم کەس بە لە تازەترین بەرهەمەکان ئاگاداربە.',
    trusted: 'کڕینی ئاسان', trustedBody: 'دۆزینەوە، هەڵبژاردن و پەیوەندی لە چەند چرکەیەکدا.',
    downloadEyebrow: 'داگرتن', downloadTitle: 'هێژین بۆ مۆبایلەکەت ئامادەیە',
    downloadBody: 'QR کۆدەکە سکان بکە یان ستۆرەکەت هەڵبژێرە. مۆبایلەکان خۆکارانە بۆ ستۆری دروست دەچن.',
    scan: 'سکان بکە بۆ داگرتن', phoneTitle: 'تازەترین کۆڵێکشنەکان', phoneSubtitle: 'تازەگەیشتووە هەڵبژێردراوەکان بۆ تۆ',
  },
  ar: {
    eyebrow: 'مرحباً بك في هجين', title: 'هجين، مستوحاة من الأناقة',
    lead: 'اكتشف أحدث المنتجات، شاهد كل التفاصيل، احفظ مفضلاتك واطلب مباشرة من هجين عبر واتساب.',
    official: 'الموقع الرسمي لهجين', languages: 'الإنجليزية والكردية والعربية',
    browse: 'تصفح المجموعات', browseBody: 'استكشف المنتجات والأسعار والصور والفيديوهات والجديد والتخفيضات.',
    favorite: 'احفظ المفضلة', favoriteBody: 'احتفظ بالمنتجات التي تحبها في مكان واحد وارجع إليها في أي وقت.',
    contact: 'اطلب بثقة', contactBody: 'افتح واتساب مباشرة من صفحة أي منتج للاستفسار والطلب.',
    aboutEyebrow: 'مصمم لعملاء هجين', aboutTitle: 'طريقة أبسط لاكتشاف كل المجموعات.',
    aboutBody: 'يجمع هجين كتالوج البوتيك المتنامي في تجربة سريعة وأنيقة. تصفح حسب التصنيف، شاهد الأسعار والمخزون، وتواصل معنا دون خطوات دفع معقدة.',
    step1: 'اكتشف أسلوبك', step2: 'احفظ ما تحب', step3: 'تواصل مع هجين',
    fast: 'مجموعات حصرية', fastBody: 'اكتشف اختيارات متوفرة حصرياً لدى هجين.',
    language: 'وصل حديثاً', languageBody: 'كن من أوائل من يكتشف أحدث منتجاتنا.',
    trusted: 'تسوّق بسهولة', trustedBody: 'اكتشف واختر وتواصل معنا خلال لحظات.',
    downloadEyebrow: 'تحميل', downloadTitle: 'هجين جاهز لهاتفك',
    downloadBody: 'امسح رمز QR أو اختر متجرك. يتم توجيه زوار الهاتف تلقائياً إلى المتجر المناسب.',
    scan: 'امسح للتحميل', phoneTitle: 'أحدث المجموعات', phoneSubtitle: 'وصل حديثاً واختير لك',
  },
};

export function HomeContent() {
  const { language } = useSitePreferences();
  const t = copy[language];
  const downloadUrl = `${siteUrl}/download`;

  return (
    <main className="home-shell">
      <section className="promo-hero" aria-label="Download the Hezhin application">
        <div className="promo-visual">
          <Image
            src="/app/hezhin-kiosk-promo.jpeg"
            alt="Hezhin application promotion"
            width={1024}
            height={1536}
            priority
            quality={95}
            sizes="(max-width: 720px) calc(100vw - 24px), min(78vw, 680px)"
            className="promo-image"
          />
        </div>

        <div className="promo-download-dock" id="download">
          <a className="promo-qr" href="/download" aria-label="Download Hezhin">
            <QRCodeSVG value={downloadUrl} size={154} bgColor="#ffffff" fgColor="#171014" />
          </a>
          <StoreButtons compact />
        </div>
      </section>

      <section className="features-section">
        <article><Sparkles /><h2>{t.browse}</h2><p>{t.browseBody}</p></article>
        <article><Heart /><h2>{t.favorite}</h2><p>{t.favoriteBody}</p></article>
        <article><MessageCircle /><h2>{t.contact}</h2><p>{t.contactBody}</p></article>
      </section>

      <section className="about-section" id="about">
        <div className="about-copy">
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
          <ol className="journey-list">
            <li><span>01</span>{t.step1}</li><li><span>02</span>{t.step2}</li><li><span>03</span>{t.step3}</li>
          </ol>
        </div>
        <div className="quality-grid">
          <article><Zap/><h3>{t.fast}</h3><p>{t.fastBody}</p></article>
          <article><Languages/><h3>{t.language}</h3><p>{t.languageBody}</p></article>
          <article><Smartphone/><h3>{t.trusted}</h3><p>{t.trustedBody}</p></article>
        </div>
      </section>

    </main>
  );
}
