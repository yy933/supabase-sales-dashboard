import { useActionState } from "react";
import supabase from "../supabase/supabase-client";
import { useAuth } from "../Hooks/useAuth";

function Form() {
  const { users, session } = useAuth();
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const submittedName = formData.get("name");
      const user = users.find((user) => user.name === submittedName);
      if (!user) {
        return new Error("User not found");
      }
      //Action logic
      const newDeal = {
        user_id: user.id,
        value: Number(formData.get("value")),
      };
      console.log(newDeal);
      //Async operation
      const { error } = await supabase.from("sales_deals").insert([newDeal]);
      // Return error state
      if (error) {
        console.error("Error adding deal: ", error.message);
        return new Error("Failed to add deal");
      }

      return null;
    },
    null, // Initial state
  );

  const currentUser = users.find((user) => user.id === session?.user?.id);
  const firstRep = users.find((u) => u.account_type === "rep");

  const generateOptions = () => {
    return users
      .filter((user) => user.account_type === "rep")
      .map((user) => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ));
  };

  return (
    <div className="add-form-container">
      <form
        action={submitAction}
        aria-label="Add new sales deal"
        aria-describedby="form-description"
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>
        {currentUser?.account_type === "rep" ? (
          <label htmlFor="deal-name">
            Name:
            <input
              type="text"
              id="deal-name"
              name="name"
              value={currentUser?.name || ""}
              readOnly
              className="rep-name-input"
              aria-label="Sales representative name"
              aria-readonly="true"
            >
            </input>
          </label>
        ) : (
          <label htmlFor="deal-name">
            Name:
            <select
              id="deal-name"
              name="name"
              defaultValue={firstRep?.name || ""}
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              disabled={isPending}
            >
              {generateOptions()}
            </select>
          </label>
        )}

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input"
            min="0"
            step="10"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Adding..." : "Add Deal"}
        </button>
      </form>

      {error && (
        <div role="alert" className="error-message">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default Form;
