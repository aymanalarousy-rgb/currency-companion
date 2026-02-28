export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 max-w-3xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">سياسة الخصوصية</h1>
      <p className="text-sm text-muted-foreground mb-6">آخر تحديث: 27 فبراير 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold mb-2">مقدمة</h2>
          <p>
            مرحباً بك في تطبيق أسعار العملات ليبيا. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيقنا.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">المعلومات التي نجمعها</h2>
          <p>تطبيقنا لا يجمع أي معلومات شخصية من المستخدمين. التطبيق يعمل كالتالي:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>عرض أسعار العملات والمعادن الثمينة في السوق الليبي</li>
            <li>عرض أسعار العملات العالمية</li>
            <li>لا يتطلب تسجيل دخول أو إنشاء حساب</li>
            <li>لا يجمع بيانات شخصية مثل الاسم أو البريد الإلكتروني أو رقم الهاتف</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">الإعلانات</h2>
          <p>
            قد يعرض التطبيق إعلانات من خلال Google AdMob. قد تستخدم خدمات الإعلانات ملفات تعريف الارتباط
            أو معرّفات الأجهزة لتقديم إعلانات مخصصة. يمكنك الاطلاع على سياسة خصوصية Google من خلال:
          </p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline mt-1 inline-block"
          >
            سياسة خصوصية Google
          </a>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">بيانات الاستخدام</h2>
          <p>
            قد نجمع بيانات استخدام مجهولة الهوية تلقائياً مثل نوع الجهاز، إصدار نظام التشغيل،
            ووقت الوصول إلى التطبيق، وذلك لتحسين أداء التطبيق وتجربة المستخدم.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">أمان البيانات</h2>
          <p>
            نحن نتخذ إجراءات أمنية مناسبة لحماية أي معلومات قد يتم جمعها.
            ومع ذلك، لا يمكن ضمان أمان أي طريقة نقل عبر الإنترنت بنسبة 100%.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">خصوصية الأطفال</h2>
          <p>
            تطبيقنا غير موجه للأطفال دون سن 13 عاماً. نحن لا نجمع عن قصد أي معلومات شخصية
            من الأطفال. إذا اكتشفنا أننا جمعنا بيانات من طفل، سنقوم بحذفها فوراً.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">التغييرات على سياسة الخصوصية</h2>
          <p>
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة
            مع تحديث تاريخ "آخر تحديث". ننصحك بمراجعة هذه السياسة بشكل دوري.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">تواصل معنا</h2>
          <p>
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر البريد الإلكتروني:
          </p>
          <p className="text-primary font-medium mt-1">libyafreea@gmail.com</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 أسعار العملات ليبيا. جميع الحقوق محفوظة.
      </div>
    </div>
  );
};
