export function handleTabs() {
  const tabButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll(".tabButton");
  for (let i = 0; i < tabButtons.length; i++) {
    const tabButton = tabButtons[i];
    tabButton.addEventListener("click", () => {
      console.log("clicked");
      const tabId = tabButton.id.replace("Button", "");
      const tab = document.getElementById(tabId);
      if (!tab) return;
      if (tab.style.display === "block") {
        tabButton.style.backgroundColor = "#ededed";
        tabButton.style.color = "#000";
        tab.style.display = "none";
      } else {
        tabButton.style.backgroundColor = "#6998ff";
        tabButton.style.color = "#fff";
        tab.style.display = "block";
      }
    });
  }
}
