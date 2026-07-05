"use client";

import SharedLayout from "@/components/SharedLayout";

export default function Privacy() {
  return (
    <SharedLayout>
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow block mb-8">Legal</span>
          <h1 className="section-heading section-heading-lg max-w-3xl mx-auto leading-tight">
            Privacy Policy
          </h1>

          <div className="mb-8 p-4 border border-[#c8ff2e]/20 bg-[#c8ff2e]/5 rounded text-sm">
            <p className="text-[#9f9dab]">
              This is a demo site. The contact email below is not active yet. If you have questions, please reach out to the person who shared this site with you directly.
            </p>
          </div>

          <div className="mt-12 text-[#9f9dab] leading-relaxed space-y-6">
            <p>
              The 404 Collective ("we", "our") respects your privacy and is committed to transparency about how we handle your data.
            </p>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              Data We Collect
            </h2>
            <p>
              When you join our waitlist, we collect only your email address. This is used solely to notify you about the launch of 404 Collective and any updates related to the product.
            </p>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To send you a single notification when 404 Collective launches</li>
              <li>To estimate the size of our initial user base for planning purposes</li>
            </ul>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              Data Sharing
            </h2>
            <p>
              We do not sell, share, or rent your email address to any third party. Your data is processed exclusively for the purposes described above.
            </p>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              Data Retention
            </h2>
            <p>
              We retain your email address until you request removal or until we decide to discontinue 404 Collective. At that time, all waitlist data will be permanently deleted. You may also contact us at any time to request deletion of your data.
            </p>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              Your Rights
            </h2>
            <p>
              Under applicable data protection laws (including the GDPR), you have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:info@404collective.com" className="text-[#c8ff2e] underline">info@404collective.com</a> for any inquiries.
            </p>

            <h2 className="text-xl font-space font-semibold text-[#e8e7e9] mt-10">
              Changes to This Policy
            </h2>
            <p>
              We may update this policy as our product evolves. Any changes will be posted on this page with an updated revision date.
            </p>

            <p className="text-[#6b6980] text-sm mt-10">
              Last updated: July 4, 2026
            </p>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
