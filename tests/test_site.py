import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


class SiteContractTests(unittest.TestCase):
    def setUp(self):
        self.content_path = ROOT / "content.json"
        self.index_path = ROOT / "index.html"
        self.dine_in_path = ROOT / "dine-in.html"
        self.take_out_path = ROOT / "外卖菜单.png"

    def test_required_files_exist(self):
        self.assertTrue(self.index_path.exists(), "index.html should exist")
        self.assertTrue(self.dine_in_path.exists(), "dine-in.html should exist")
        self.assertTrue(self.take_out_path.exists(), "take-out image should exist")

    def test_content_json_matches_expected_schema(self):
        data = json.loads(self.content_path.read_text(encoding="utf-8"))

        self.assertEqual(
            set(data.keys()),
            {"brand", "contact", "links", "social", "home", "dineIn", "menus"},
        )

        self.assertIn("name", data["brand"])
        self.assertIn("tagline", data["brand"])
        self.assertIn("logoPath", data["brand"])
        self.assertIn("posterTitleLines", data["brand"])
        self.assertIn("posterSubtitleLines", data["brand"])
        self.assertIsInstance(data["brand"]["posterTitleLines"], list)
        self.assertIsInstance(data["brand"]["posterSubtitleLines"], list)
        self.assertGreaterEqual(len(data["brand"]["posterTitleLines"]), 2)
        self.assertGreaterEqual(len(data["brand"]["posterSubtitleLines"]), 2)

        self.assertIn("addressLines", data["contact"])
        self.assertIn("phoneLabel", data["contact"])
        self.assertIn("phoneNumber", data["contact"])
        self.assertIn("phoneHref", data["contact"])
        self.assertIn("hours", data["contact"])

        self.assertIn("maps", data["links"])
        self.assertIn("whatsapp", data["links"])

        self.assertEqual(set(data["social"].keys()), {"tiktok", "instagram", "facebook"})

        self.assertIn("takeOutDownloadPath", data["home"])
        self.assertIn("ctaLabels", data["home"])
        self.assertEqual(data["home"]["takeOutDownloadPath"], "./外卖菜单.png")
        self.assertIn("socialHeading", data["home"])
        self.assertIn("whatsappBannerLabel", data["home"])
        self.assertIn("navigationBannerTitle", data["home"])
        self.assertIn("navigationBannerSubtitle", data["home"])
        self.assertIn("dineInDescription", data["home"]["ctaLabels"])
        self.assertIn("takeOutDescription", data["home"]["ctaLabels"])

        self.assertEqual(
            data["dineIn"]["categories"],
            ["A La Carte", "Rijst Tafel 55", "Rijst Tafel 65"],
        )

        self.assertIn("aLaCarte", data["menus"])
        self.assertIn("rijstTafel55", data["menus"])
        self.assertIn("rijstTafel65", data["menus"])

        expected_sections = {
            "Appetizers",
            "Soups",
            "Chicken",
            "Duck",
            "Beef",
            "Pork",
            "Seafood",
            "Noodles",
            "Fried Rice",
            "Specialties",
            "Vegetarian",
            "Side Orders",
            "Sauces",
            "Drinks",
        }
        actual_sections = {section["title"] for section in data["menus"]["aLaCarte"]}
        self.assertTrue(expected_sections.issubset(actual_sections))

    def test_pages_load_shared_content_file(self):
        index_html = self.index_path.read_text(encoding="utf-8")
        dine_in_html = self.dine_in_path.read_text(encoding="utf-8")

        self.assertIn("./content.json", index_html)
        self.assertIn("./content.json", dine_in_html)
        self.assertIn("dine-in.html", index_html)
        self.assertIn("外卖菜单.png", index_html)

    def test_rijsttafel_pdf_content_is_structured_as_menu_text(self):
        data = json.loads(self.content_path.read_text(encoding="utf-8"))
        menu_55 = data["menus"]["rijstTafel55"]
        menu_65 = data["menus"]["rijstTafel65"]

        for menu, price in ((menu_55, "Afl 55.00"), (menu_65, "Afl 65.00")):
            self.assertEqual(menu["minimumGuests"], 6)
            self.assertEqual(menu["pricePerPerson"], price)
            self.assertIn("15%", menu["serviceChargeNote"])
            self.assertIn("sections", menu)

        sections_55 = {section["title"]: section["items"] for section in menu_55["sections"]}
        sections_65 = {section["title"]: section["items"] for section in menu_65["sections"]}

        self.assertEqual(len(sections_55["Main Course"]), 7)
        self.assertEqual(len(sections_65["Main Course"]), 7)
        self.assertIn("Appetizer", sections_65)
        self.assertIn("Dessert", sections_65)
        self.assertEqual(sections_65["Appetizer"][0]["name"], "Wonton Soup or Chicken Vegetable Soup")

    def test_dine_in_page_has_branded_menu_structure(self):
        dine_in_html = self.dine_in_path.read_text(encoding="utf-8")

        self.assertIn("data-dine-shell", dine_in_html)
        self.assertIn("dine-brand-mark", dine_in_html)
        self.assertIn("dine-menu-heading", dine_in_html)

    def test_homepage_matches_poster_layout_contract(self):
        index_html = self.index_path.read_text(encoding="utf-8")
        styles_css = (ROOT / "styles.css").read_text(encoding="utf-8")

        self.assertIn("data-poster-shell", index_html)
        self.assertIn("data-poster-title", index_html)
        self.assertIn("data-poster-subtitle", index_html)
        self.assertIn("data-contact-bar", index_html)
        self.assertIn("data-social-heading", index_html)
        self.assertIn("data-whatsapp-banner", index_html)
        self.assertIn("data-navigation-banner", index_html)

        self.assertNotIn("data-hero-image", index_html)
        self.assertNotIn("hero-panel", index_html)
        self.assertIn("poster-frame poster-frame--contact", index_html)
        self.assertIn("poster-frame poster-frame--action", index_html)
        self.assertIn("poster-frame poster-frame--banner", index_html)
        self.assertIn(".poster-frame", styles_css)
        self.assertIn(".poster-frame--action", styles_css)
        self.assertIn(".poster-frame--banner", styles_css)
        self.assertIn("clip-path", styles_css)
        self.assertIn("--poster-action-corner", styles_css)
        self.assertIn(".poster-frame--action::before", styles_css)
        self.assertIn(".poster-frame--action::after", styles_css)
        self.assertIn("inset: 2px", styles_css)
        self.assertIn("--poster-banner-corner", styles_css)
        self.assertIn(".poster-frame--banner::before", styles_css)
        self.assertIn(".poster-frame--banner::after", styles_css)


if __name__ == "__main__":
    unittest.main()
