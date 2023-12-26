import rosetta from "rosetta";
const i18n = rosetta({
  en: {
    landing: {
      header: "Hello! Want to evaluate a math expression",
      form: {
        placeholder: "Your expression",
        button: "Evaluate",
        filters: {
          length: "The expression must atleast be 3 characters long",
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
        ⊕: Xor
        →: Implication
        ↔: Equivalance`,
      },
    },
  },
  ar: {
    landing: {
      header: "مرحبا! لنكتشف بعضا من الرياضيات",
      form: {
        placeholder: "العبارة الخاصة بك",
        button: "تقديم",
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
      },
      info: [""],
    },
  },
});
i18n.locale("en");

export default i18n;
