import { $TSFixMe, resolveInvokedContext, TWizardSerializations } from "@upsolve/wizards";
import { assign } from "xstate";

// =================
// ACTIONS
// =================
const actions: TWizardSerializations["actions"] = {
  resolveInvokedContext,
  "Screener.incrementWizardScore": assign({
    states: (ctx) => ({ ...ctx.states, wizardScore: ctx.states.wizardScore + 1 }),
  }),
  "Screener.incrementWizardScoreBy": assign({
    states: (ctx, ev) => ({
      ...ctx.states,
      wizardScore: ctx.states.wizardScore + Math.max(Number(ev?.data?.incrementBy) || 0),
    }),
  }),
  "Screener.isInterested": assign({ states: (ctx) => ({ ...ctx.states, isInterestedInInterview: true }) }),
  // --- models (auto-generate from loader modelNames)
  // Models.User.create...
  // Models.User.delete...
};

// =================
// FUNCTIONS (for ContentNode strings, conditional evaluations, forEach iterators, etc... as well as invoked srcs)
// =================
const functions: TWizardSerializations["functions"] = {
  selectUser: (ctx: $TSFixMe, key: string) => {
    // console.warn("selectUser: ", cloneDeep(ctx), key);
    const user = Object.values(ctx.resources?.User ?? {})?.[0];
    return key ? user?.[key] : user;
  },
};

// =================
// VALIDATIONS (for inputs only)
// =================
const validations: TWizardSerializations["validations"] = {
  isCurrentYear: (value) => (String(new Date().getFullYear()) === value ? null : "That's the wrong year"),
  startOfPi: (value) => {
    if (!String(value).startsWith("3.14")) return "Pi should start with 3.14...";
    return null;
  },
};

export const wizardSerializations: TWizardSerializations = {
  actions,
  components: {},
  functions,
  guards: {},
  validations,
};