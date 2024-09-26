import rosetta from "rosetta";
const i18n = rosetta({
  en: {
    landing: {
      header: "Generate a truth table to your liking!",
      form: {
        placeholder: "Your expression",
        button: "Evaluate",
        filters: {
          length: "The expression must atleast be 3 characters long.",
        },
        errors: {
          1: "Invalid character",
          2: "Missing closing parantheses",
          3: "Missing opening parantheses",
          4: "Invalid operator position",
          5: "Invalid operand position",
          6: "Invalid parantheses position",
        },
        desc: `~,¬: Negation
        ∧,.: Conjunction
        V,+: Disjunction
        ⊕: XOR
        →: Implication
        ↔: Equivalance`,
      },
    },
    footer: ({ year }: { year: number }) => `Made by Mahdi Djaber. © ${year}.`
  },
  ar: {
    landing: {
      header: "!أنشا جداول صواب لعباراتك المنطقية المفضلة",
      form: {
        placeholder: "العبارة الخاصة بك",
        button: "معالجة",
        filters: {
          length: "يجب على العبارة ان تكون على الاقل بطول ثلاثة حروف",
        },
        errors: {
          1: "حرف غير مسموح به",
          2: "لا وجود لقوس الاغلاق",
          3: "لا وجود لقوس الفتح",
          4: "موضع العملية غير صحيح",
          5: "موضع عنصر عملية غير صحيح",
          6: "موضع قوس غير صحيح",
        },
        desc: `~,¬: الضد
        ∧,.: التقاطع
        V,+: الإتحاد
        ⊕: XOR
        →: إستلزام
        ↔: تكافؤ`,
      },
    },
    footer: ({ year }: { year: number }) => `طور بواسطة مهدي جابر. © ${year}.`
  },
});
i18n.locale("en");

export default i18n;
