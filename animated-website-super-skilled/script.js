/* ═══════════════════════════════════════
   MIXMASTER AI — SCRIPT
   TheCocktailDB API + LocalStorage
═══════════════════════════════════════ */

const API = 'https://www.thecocktaildb.com/api/json/v1/1';

const TRENDING = ['Margarita', 'Mojito', 'Negroni', 'Old Fashioned', 'Espresso Martini', 'Cosmopolitan'];

const INVENTORY_CATEGORIES = {
  'Spirits': ['Vodka', 'Rum', 'Gin', 'Tequila', 'Whiskey', 'Bourbon', 'Scotch', 'Brandy', 'Mezcal', 'Triple sec', 'Kahlua', 'Baileys', 'Champagne', 'Prosecco', 'Vermouth'],
  'Mixers': ['Soda water', 'Tonic water', 'Ginger beer', 'Ginger ale', 'Cola', 'Lemonade', 'Orange juice', 'Cranberry juice', 'Pineapple juice', 'Tomato juice', 'Apple juice', 'Coconut cream'],
  'Syrups & Sweeteners': ['Simple syrup', 'Grenadine', 'Honey', 'Sugar', 'Agave syrup', 'Blue Curacao', 'Amaretto', 'Peach schnapps'],
  'Citrus & Fresh': ['Lime juice', 'Lemon juice', 'Lime', 'Lemon', 'Orange', 'Grapefruit juice'],
  'Bitters & Extras': ['Angostura bitters', 'Peychaud\'s bitters', 'Egg white', 'Cream', 'Tabasco', 'Worcestershire sauce', 'Salt', 'Celery salt'],
  'Garnishes': ['Mint', 'Maraschino cherry', 'Olive', 'Cucumber', 'Ice'],
};

const SAMPLE_COMMUNITY = [
  // ── CLASSIC HIGHBALLS ──
  { id: 'c01', name: 'Rum & Coke', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz rum (white or dark)\n4 oz cola\nIce\nLime wedge', instructions: 'Fill glass with ice. Pour rum over ice. Top with cold cola. Squeeze in lime and drop it in. Stir once gently.', garnish: 'Lime wedge', flavor: 'Sweet, refreshing', alcoholic: true, likes: 148 },
  { id: 'c02', name: 'Gin & Tonic', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz gin\n4 oz tonic water\nIce\nLime wedge', instructions: 'Fill glass with ice. Pour gin. Top with cold tonic water. Garnish with lime.', garnish: 'Lime wedge, juniper berries', flavor: 'Crisp, bitter, botanical', alcoholic: true, likes: 134 },
  { id: 'c03', name: 'Vodka Soda', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz vodka\n4 oz soda water\nSqueeze of lime\nIce', instructions: 'Fill glass with ice. Add vodka and a squeeze of fresh lime. Top with soda water. Stir lightly.', garnish: 'Lime wedge', flavor: 'Clean, light, citrusy', alcoholic: true, likes: 112 },
  { id: 'c04', name: 'Whiskey Ginger', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz bourbon or whiskey\n4 oz ginger ale or ginger beer\nIce\nLemon wedge', instructions: 'Fill a highball glass with ice. Pour whiskey over ice. Top with ginger ale. Squeeze in lemon and drop it in.', garnish: 'Lemon wedge', flavor: 'Spicy, warm, refreshing', alcoholic: true, likes: 97 },
  { id: 'c05', name: 'Screwdriver', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz vodka\n4 oz fresh orange juice\nIce', instructions: 'Fill glass with ice. Add vodka. Top with fresh orange juice. Stir and serve.', garnish: 'Orange slice', flavor: 'Citrusy, sweet', alcoholic: true, likes: 88 },
  { id: 'c06', name: 'Tequila Sunrise', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz tequila\n4 oz orange juice\n0.5 oz grenadine\nIce', instructions: 'Fill glass with ice. Add tequila and orange juice. Slowly pour grenadine down the side — it sinks to create the sunrise effect. Do not stir.', garnish: 'Orange slice, cherry', flavor: 'Sweet, fruity, tropical', alcoholic: true, likes: 103 },
  { id: 'c07', name: 'Rum & Pineapple', author: 'Sam L.', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz white rum\n4 oz pineapple juice\n0.5 oz lime juice\nIce', instructions: 'Fill glass with ice. Add rum and lime juice. Top with pineapple juice. Stir gently.', garnish: 'Pineapple wedge, lime slice', flavor: 'Tropical, sweet, tangy', alcoholic: true, likes: 76 },

  // ── NON-ALCOHOLIC / MOCKTAILS ──
  { id: 'c08', name: 'Shirley Temple', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '4 oz ginger ale\n4 oz orange juice\n0.5 oz grenadine\nIce', instructions: 'Fill glass with ice. Add orange juice and ginger ale. Slowly pour grenadine down the side for the layered sunset effect. Do not stir before serving.', garnish: 'Maraschino cherry, orange slice', flavor: 'Sweet, fruity, bubbly', alcoholic: false, likes: 156 },
  { id: 'c09', name: 'Dirty Shirley', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz vodka\n3 oz lemon-lime soda\n3 oz ginger ale\n1 oz grenadine\nIce', instructions: 'Fill glass with ice. Add vodka. Pour soda and ginger ale. Slowly pour grenadine down the inside of the glass for the layered look.', garnish: 'Maraschino cherry, lime wedge', flavor: 'Sweet, bubbly, fruity', alcoholic: true, likes: 142 },
  { id: 'c10', name: 'Arnold Palmer', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '4 oz unsweetened iced tea\n4 oz lemonade\nIce\nFresh mint (optional)', instructions: 'Fill glass with ice. Pour equal parts iced tea and lemonade. Stir gently. Add mint if desired.', garnish: 'Lemon slice, mint sprig', flavor: 'Refreshing, lightly sweet, citrusy', alcoholic: false, likes: 119 },
  { id: 'c11', name: 'Roy Rogers', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '6 oz cola\n0.5 oz grenadine\nIce', instructions: 'Fill glass with ice. Add grenadine. Top with cold cola. Stir gently and garnish.', garnish: 'Maraschino cherry, orange slice', flavor: 'Sweet, fizzy', alcoholic: false, likes: 74 },
  { id: 'c12', name: 'Tropical Punch', author: 'Riley K.', glass: 'Highball', difficulty: 'Easy', ingredients: '3 oz pineapple juice\n2 oz orange juice\n1 oz cranberry juice\n2 oz coconut cream\nIce', instructions: 'Blend all ingredients with ice until smooth. Pour into glass and serve immediately.', garnish: 'Pineapple chunk, cherry', flavor: 'Sweet, tropical, creamy', alcoholic: false, likes: 87 },
  { id: 'c13', name: 'Virgin Mary', author: 'Jamie C.', glass: 'Highball', difficulty: 'Easy', ingredients: '4 oz tomato juice\n0.5 oz lemon juice\n1 tsp Worcestershire sauce\nTabasco to taste\nCelery salt, black pepper\nIce', instructions: 'Mix all ingredients over ice. Adjust heat with Tabasco. Rim glass with celery salt.', garnish: 'Celery stalk, lemon wedge', flavor: 'Savory, spicy, fresh', alcoholic: false, likes: 63 },
  { id: 'c14', name: 'Watermelon Cooler', author: 'Sam L.', glass: 'Highball', difficulty: 'Easy', ingredients: '3 cups fresh watermelon\n1 oz lime juice\n1 tbsp honey\n2 oz sparkling water\nIce', instructions: 'Blend watermelon until smooth. Strain. Mix with lime juice and honey. Pour over ice and top with sparkling water.', garnish: 'Watermelon wedge, mint', flavor: 'Fresh, sweet, light', alcoholic: false, likes: 63 },

  // ── CLASSIC COCKTAILS ──
  { id: 'c15', name: 'Moscow Mule', author: 'MixMaster', glass: 'Copper Mug', difficulty: 'Easy', ingredients: '2 oz vodka\n4 oz ginger beer\n0.5 oz lime juice\nIce', instructions: 'Fill copper mug with ice. Add vodka and lime juice. Top with ginger beer. Stir and serve cold.', garnish: 'Lime wedge, candied ginger', flavor: 'Spicy, citrusy, refreshing', alcoholic: true, likes: 127 },
  { id: 'c16', name: 'Paloma', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz tequila\n4 oz grapefruit soda\n0.5 oz lime juice\nPinch of salt\nIce', instructions: 'Rim glass with salt. Fill with ice. Add tequila and lime juice. Top with grapefruit soda. Stir gently.', garnish: 'Grapefruit wedge, salted rim', flavor: 'Tart, refreshing, slightly bitter', alcoholic: true, likes: 91 },
  { id: 'c17', name: 'Aperol Spritz', author: 'Jamie C.', glass: 'Copa', difficulty: 'Easy', ingredients: '3 oz prosecco\n2 oz Aperol\n1 oz soda water\nIce', instructions: 'Fill Copa glass with ice. Add prosecco, then Aperol, then soda. Stir once very gently.', garnish: 'Orange half-wheel', flavor: 'Bitter, citrusy, sparkling', alcoholic: true, likes: 138 },
  { id: 'c18', name: 'Dark & Stormy', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz dark rum\n4 oz ginger beer\n0.5 oz lime juice\nIce', instructions: 'Fill glass with ice and lime juice. Pour ginger beer. Float dark rum on top by pouring slowly over the back of a spoon.', garnish: 'Lime wedge, candied ginger', flavor: 'Spicy, rich, bold', alcoholic: true, likes: 96 },
  { id: 'c19', name: 'Gin Fizz', author: 'Alex M.', glass: 'Highball', difficulty: 'Medium', ingredients: '2 oz gin\n1 oz lemon juice\n0.5 oz simple syrup\n2 oz soda water\n1 egg white (optional)\nIce', instructions: 'If using egg white, dry shake first without ice. Add ice and shake again. Strain into glass and top with soda water.', garnish: 'Lemon wheel', flavor: 'Tart, frothy, refreshing', alcoholic: true, likes: 82 },
  { id: 'c20', name: 'Tom Collins', author: 'MixMaster', glass: 'Collins', difficulty: 'Easy', ingredients: '2 oz gin\n1 oz lemon juice\n0.5 oz simple syrup\n3 oz soda water\nIce', instructions: 'Combine gin, lemon juice, and syrup in a glass with ice. Top with soda water. Stir gently.', garnish: 'Lemon slice, cherry', flavor: 'Citrusy, light, refreshing', alcoholic: true, likes: 78 },
  { id: 'c21', name: 'Amaretto Sour', author: 'Riley K.', glass: 'Rocks', difficulty: 'Easy', ingredients: '2 oz amaretto\n0.75 oz lemon juice\n0.5 oz simple syrup\n1 egg white\nIce', instructions: 'Dry shake all ingredients first. Add ice and shake again vigorously. Strain over fresh ice.', garnish: 'Cherry, lemon peel', flavor: 'Nutty, sweet, citrusy, frothy', alcoholic: true, likes: 93 },
  { id: 'c22', name: 'Whiskey Sour', author: 'MixMaster', glass: 'Rocks', difficulty: 'Easy', ingredients: '2 oz bourbon\n0.75 oz lemon juice\n0.5 oz simple syrup\n1 egg white (optional)\nIce', instructions: 'Shake all ingredients with ice. Strain into rocks glass over fresh ice. If using egg white, dry shake first.', garnish: 'Lemon slice, cherry', flavor: 'Tart, smooth, slightly sweet', alcoholic: true, likes: 107 },

  // ── BRUNCH ──
  { id: 'c23', name: 'Mimosa', author: 'MixMaster', glass: 'Champagne flute', difficulty: 'Easy', ingredients: '3 oz prosecco or champagne\n3 oz fresh orange juice', instructions: 'Pour chilled orange juice into a champagne flute. Gently top with cold prosecco. Do not stir.', garnish: 'Orange twist', flavor: 'Bright, citrusy, bubbly', alcoholic: true, likes: 167 },
  { id: 'c24', name: 'Bloody Mary', author: 'Jamie C.', glass: 'Highball', difficulty: 'Medium', ingredients: '2 oz vodka\n4 oz tomato juice\n0.5 oz lemon juice\n1 tsp Worcestershire sauce\nTabasco to taste\nCelery salt & black pepper\nIce', instructions: 'Rim glass with celery salt. Fill with ice. Add all ingredients. Stir well and adjust spice to taste.', garnish: 'Celery stalk, lemon wedge, pickles', flavor: 'Savory, spicy, umami', alcoholic: true, likes: 104 },
  { id: 'c25', name: 'Bellini', author: 'Riley K.', glass: 'Champagne flute', difficulty: 'Easy', ingredients: '2 oz peach purée (fresh or canned)\n4 oz prosecco', instructions: 'Pour peach purée into champagne flute. Slowly top with cold prosecco. Stir once very gently.', garnish: 'Peach slice', flavor: 'Sweet, peachy, delicate', alcoholic: true, likes: 89 },

  // ── TROPICAL & PARTY ──
  { id: 'c26', name: 'Piña Colada', author: 'Sam L.', glass: 'Hurricane', difficulty: 'Medium', ingredients: '2 oz white rum\n2 oz coconut cream\n4 oz pineapple juice\nCrushed ice', instructions: 'Blend all ingredients with crushed ice until smooth and creamy. Pour into glass.', garnish: 'Pineapple slice, cherry, toasted coconut', flavor: 'Creamy, tropical, sweet', alcoholic: true, likes: 143 },
  { id: 'c27', name: 'Sex on the Beach', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '1.5 oz vodka\n0.5 oz peach schnapps\n2 oz orange juice\n2 oz cranberry juice\nIce', instructions: 'Fill glass with ice. Add vodka and peach schnapps. Pour juices. Stir gently to combine.', garnish: 'Orange slice, cherry', flavor: 'Fruity, sweet, tropical', alcoholic: true, likes: 118 },
  { id: 'c28', name: 'Blue Lagoon', author: 'Alex M.', glass: 'Highball', difficulty: 'Easy', ingredients: '1.5 oz vodka\n1 oz blue curacao\n4 oz lemonade\nIce', instructions: 'Fill glass with ice. Add vodka and blue curacao. Top with lemonade. Stir gently — the blue color is stunning!', garnish: 'Lemon slice, maraschino cherry', flavor: 'Sweet, citrusy, tropical', alcoholic: true, likes: 94 },
  { id: 'c29', name: 'Long Island Iced Tea', author: 'Jamie C.', glass: 'Collins', difficulty: 'Medium', ingredients: '0.5 oz vodka\n0.5 oz rum\n0.5 oz gin\n0.5 oz tequila\n0.5 oz triple sec\n1 oz lemon juice\n0.5 oz simple syrup\nSplash of cola\nIce', instructions: 'Combine all spirits, lemon juice, and syrup in a shaker with ice. Shake and strain. Top with a splash of cola for color.', garnish: 'Lemon wedge', flavor: 'Strong, citrusy, deceptively smooth', alcoholic: true, likes: 109 },
  { id: 'c30', name: 'Hurricane', author: 'Sam L.', glass: 'Hurricane', difficulty: 'Medium', ingredients: '1 oz white rum\n1 oz dark rum\n0.5 oz passion fruit syrup\n0.5 oz lime juice\n2 oz orange juice\n1 oz grenadine\nIce', instructions: 'Combine all ingredients in a shaker with ice. Shake well and pour into hurricane glass. Garnish generously.', garnish: 'Orange slice, cherry, umbrella', flavor: 'Fruity, tropical, boozy', alcoholic: true, likes: 85 },

  // ── SHOTS ──
  { id: 'c31', name: 'Lemon Drop Shot', author: 'MixMaster', glass: 'Shot glass', difficulty: 'Easy', ingredients: '1.5 oz citrus vodka\n0.5 oz triple sec\n0.75 oz lemon juice\nSugar rim', instructions: 'Rim shot glass with sugar. Shake all ingredients with ice and strain into the glass.', garnish: 'Sugared rim', flavor: 'Tart, sweet, bright', alcoholic: true, likes: 72 },
  { id: 'c32', name: 'B-52 Shot', author: 'Riley K.', glass: 'Shot glass', difficulty: 'Medium', ingredients: '0.5 oz Kahlua\n0.5 oz Baileys Irish Cream\n0.5 oz Grand Marnier', instructions: 'Layer in a shot glass: Kahlua first, then Baileys (pour slowly over a spoon), then Grand Marnier on top. Serve layered.', garnish: 'None — admire the layers!', flavor: 'Rich, creamy, coffee', alcoholic: true, likes: 58 },
  { id: 'c33', name: 'Kamikaze Shot', author: 'Alex M.', glass: 'Shot glass', difficulty: 'Easy', ingredients: '1 oz vodka\n0.5 oz triple sec\n0.5 oz lime juice', instructions: 'Shake all ingredients with ice. Strain into a shot glass. Clean and punchy.', garnish: 'Lime wedge on the side', flavor: 'Crisp, tart, boozy', alcoholic: true, likes: 64 },

  // ── ORIGINAL CREATIONS ──
  { id: 'c34', name: 'Neon Sunset', author: 'Alex M.', glass: 'Copa', difficulty: 'Easy', ingredients: '2 oz tequila\n1 oz lime juice\n1 oz blue curacao\nSalt rim\nIce', instructions: 'Rim glass with salt. Fill with ice. Pour tequila and lime. Float blue curacao on top.', garnish: 'Lime wheel', flavor: 'Citrusy, vibrant', alcoholic: true, likes: 42 },
  { id: 'c35', name: 'Sparkling Sage Lemonade', author: 'Riley K.', glass: 'Highball', difficulty: 'Easy', ingredients: '4 oz lemonade\n2 oz soda water\n5–6 sage leaves\n1 tbsp honey', instructions: 'Muddle sage with honey. Add ice, lemonade, and soda. Stir gently.', garnish: 'Sage sprig', flavor: 'Herbal, refreshing', alcoholic: false, likes: 28 },
  { id: 'c36', name: 'Midnight Espresso Martini', author: 'Jamie C.', glass: 'Martini', difficulty: 'Medium', ingredients: '2 oz vodka\n1 oz Kahlua\n1 oz espresso (chilled)\n0.5 oz simple syrup', instructions: 'Shake all ingredients vigorously with ice until foamy. Double-strain into chilled martini glass.', garnish: '3 coffee beans', flavor: 'Rich, bittersweet', alcoholic: true, likes: 67 },
  { id: 'c37', name: 'Tropical Storm', author: 'Sam L.', glass: 'Hurricane', difficulty: 'Medium', ingredients: '1.5 oz rum\n0.5 oz coconut rum\n2 oz pineapple juice\n1 oz orange juice\n0.5 oz grenadine', instructions: 'Blend all ingredients with ice until smooth. Pour into glass. Drizzle grenadine.', garnish: 'Pineapple slice, cherry', flavor: 'Tropical, sweet', alcoholic: true, likes: 35 },

  // ── GIN CLASSICS ──
  { id: 'c38', name: 'Classic Martini', author: 'MixMaster', glass: 'Martini', difficulty: 'Easy', ingredients: '2.5 oz gin\n0.5 oz dry vermouth\nIce (for stirring)', instructions: 'Chill a martini glass. Combine gin and vermouth in a mixing glass with ice. Stir for 30 seconds until very cold. Strain into chilled glass. Garnish with a lemon twist or olive.', garnish: 'Lemon twist or olive', flavor: 'Dry, botanical, crisp', alcoholic: true, likes: 201 },
  { id: 'c39', name: 'Negroni', author: 'MixMaster', glass: 'Rocks', difficulty: 'Easy', ingredients: '1 oz gin\n1 oz sweet vermouth\n1 oz Campari\nIce\nOrange peel', instructions: 'Combine gin, sweet vermouth, and Campari in a rocks glass over a large ice cube. Stir gently for 15 seconds. Squeeze an orange peel over the glass to express the oils, then drop it in.', garnish: 'Orange peel or slice', flavor: 'Bitter, herbal, citrusy', alcoholic: true, likes: 187 },
  { id: 'c40', name: 'French 75', author: 'Jamie C.', glass: 'Flute', difficulty: 'Easy', ingredients: '1.5 oz gin\n0.75 oz fresh lemon juice\n0.5 oz simple syrup\n3 oz champagne or prosecco', instructions: 'Shake gin, lemon juice, and simple syrup with ice. Strain into a champagne flute. Top with cold champagne. Garnish with a lemon twist.', garnish: 'Lemon twist', flavor: 'Bright, citrusy, bubbly', alcoholic: true, likes: 143 },
  { id: 'c41', name: 'Gimlet', author: 'Riley K.', glass: 'Coupe', difficulty: 'Easy', ingredients: '2 oz gin\n0.75 oz fresh lime juice\n0.75 oz simple syrup\nIce', instructions: 'Shake all ingredients vigorously with ice. Double-strain into a chilled coupe glass. A perfectly balanced refresher.', garnish: 'Lime wheel or twist', flavor: 'Tart, clean, slightly sweet', alcoholic: true, likes: 112 },
  { id: 'c42', name: 'Aviation', author: 'Alex M.', glass: 'Coupe', difficulty: 'Medium', ingredients: '2 oz gin\n0.5 oz maraschino liqueur\n0.5 oz fresh lemon juice\n0.25 oz crème de violette', instructions: 'Shake all ingredients with ice. Double-strain into a chilled coupe. The crème de violette gives this classic its famous lavender hue.', garnish: 'Maraschino cherry', flavor: 'Floral, citrusy, slightly sweet', alcoholic: true, likes: 88 },
  { id: 'c43', name: 'Last Word', author: 'Alex M.', glass: 'Coupe', difficulty: 'Medium', ingredients: '0.75 oz gin\n0.75 oz green Chartreuse\n0.75 oz maraschino liqueur\n0.75 oz fresh lime juice', instructions: 'Combine all equal-parts ingredients in a shaker with ice. Shake well. Double-strain into a chilled coupe. Perfectly balanced between herbal, sweet, and sour.', garnish: 'Lime twist', flavor: 'Herbal, citrusy, complex', alcoholic: true, likes: 74 },
  { id: 'c44', name: 'Singapore Sling', author: 'MixMaster', glass: 'Collins', difficulty: 'Hard', ingredients: '1.5 oz gin\n0.5 oz Cherry Heering\n0.25 oz Cointreau\n0.25 oz Benedictine\n1.5 oz pineapple juice\n0.5 oz lime juice\nDash of grenadine\nDash of Angostura bitters\n2 oz soda water', instructions: 'Shake all ingredients except soda with ice. Strain into an ice-filled Collins glass. Top with soda and stir once. Garnish generously.', garnish: 'Pineapple slice, cherry, orange', flavor: 'Fruity, herbal, tropical', alcoholic: true, likes: 67 },

  // ── WHISKEY / BOURBON CLASSICS ──
  { id: 'c45', name: 'Old Fashioned', author: 'MixMaster', glass: 'Rocks', difficulty: 'Easy', ingredients: '2 oz bourbon or rye whiskey\n1 tsp sugar or simple syrup\n2 dashes Angostura bitters\nSplash of water\nIce', instructions: 'Add sugar and bitters to a rocks glass. Splash with water and stir until sugar dissolves. Add a large ice cube. Pour whiskey over and stir gently for 20 seconds. Squeeze orange peel over the top.', garnish: 'Orange peel, Maraschino cherry', flavor: 'Rich, warming, lightly sweet', alcoholic: true, likes: 234 },
  { id: 'c46', name: 'Manhattan', author: 'MixMaster', glass: 'Coupe', difficulty: 'Easy', ingredients: '2 oz rye whiskey\n1 oz sweet vermouth\n2 dashes Angostura bitters\nIce (for stirring)', instructions: 'Combine all ingredients in a mixing glass with ice. Stir for 30 seconds until well chilled and diluted. Strain into a chilled coupe or martini glass. Garnish with a cherry.', garnish: 'Maraschino cherry', flavor: 'Bold, complex, slightly sweet', alcoholic: true, likes: 178 },
  { id: 'c47', name: 'Mint Julep', author: 'Jamie C.', glass: 'Copper Mug', difficulty: 'Easy', ingredients: '2.5 oz bourbon\n0.5 oz simple syrup\n10 fresh mint leaves\nCrushed ice', instructions: 'Gently muddle mint with simple syrup in a julep cup or glass — just bruise it, don\'t tear. Fill with crushed ice. Pour bourbon over. Stir gently. Top with more crushed ice and garnish.', garnish: 'Fresh mint bouquet, powdered sugar', flavor: 'Cool, minty, smooth', alcoholic: true, likes: 119 },
  { id: 'c48', name: 'Boulevardier', author: 'Riley K.', glass: 'Rocks', difficulty: 'Easy', ingredients: '1.5 oz bourbon\n1 oz sweet vermouth\n1 oz Campari\nIce', instructions: 'Stir all ingredients with ice in a mixing glass for 30 seconds. Strain into a rocks glass over a large ice cube. Express an orange peel over the top. The whiskey-lover\'s Negroni.', garnish: 'Orange peel or cherry', flavor: 'Rich, bitter, warming', alcoholic: true, likes: 92 },
  { id: 'c49', name: 'Sazerac', author: 'MixMaster', glass: 'Rocks', difficulty: 'Medium', ingredients: '2 oz rye whiskey\n1/4 oz absinthe (for rinsing)\n1 sugar cube\n2 dashes Peychaud\'s bitters\nDash of Angostura bitters', instructions: 'Rinse a chilled rocks glass with absinthe, coat the inside, and discard excess. In a mixing glass, muddle the sugar cube with bitters. Add rye and ice. Stir 30 seconds. Strain into the rinsed glass (no ice). Express lemon peel over the top.', garnish: 'Lemon peel (expressed, not dropped in)', flavor: 'Bold, anise-forward, complex', alcoholic: true, likes: 84 },
  { id: 'c50', name: 'Hot Toddy', author: 'Sam L.', glass: 'Mug', difficulty: 'Easy', ingredients: '2 oz whiskey or bourbon\n1 tbsp honey\n0.75 oz fresh lemon juice\n6 oz hot water\n1 cinnamon stick', instructions: 'Add honey and lemon juice to a mug. Pour in just-boiled hot water and stir until honey dissolves. Add whiskey and stir. Drop in a cinnamon stick. Serve hot.', garnish: 'Lemon slice, cinnamon stick, star anise', flavor: 'Warm, soothing, honey-sweet', alcoholic: true, likes: 131 },
  { id: 'c51', name: 'Paper Plane', author: 'Alex M.', glass: 'Coupe', difficulty: 'Medium', ingredients: '0.75 oz bourbon\n0.75 oz Aperol\n0.75 oz Amaro Nonino\n0.75 oz fresh lemon juice', instructions: 'Combine all equal-parts ingredients in a shaker with ice. Shake vigorously. Double-strain into a chilled coupe. A modern classic with perfect balance.', garnish: 'None or lemon twist', flavor: 'Bitter, citrusy, complex', alcoholic: true, likes: 63 },
  { id: 'c52', name: 'Kentucky Mule', author: 'Jamie C.', glass: 'Copper Mug', difficulty: 'Easy', ingredients: '2 oz bourbon\n0.5 oz fresh lime juice\n4 oz ginger beer\nIce', instructions: 'Fill a copper mug with ice. Add bourbon and lime juice. Top with cold ginger beer and stir gently. The bourbon twist on a Moscow Mule.', garnish: 'Lime wedge, candied ginger', flavor: 'Spicy, warm, refreshing', alcoholic: true, likes: 97 },

  // ── RUM CLASSICS ──
  { id: 'c53', name: 'Mojito', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz white rum\n1 oz fresh lime juice\n2 tsp sugar\n8 fresh mint leaves\n3 oz soda water', instructions: 'Gently muddle mint with sugar and lime juice in a glass — just bruise the mint. Add ice. Pour rum over. Top with soda water and stir once from the bottom. Taste and adjust sweetness.', garnish: 'Mint sprig, lime wheel', flavor: 'Fresh, minty, citrusy', alcoholic: true, likes: 198 },
  { id: 'c54', name: 'Daiquiri', author: 'MixMaster', glass: 'Coupe', difficulty: 'Easy', ingredients: '2 oz white rum\n1 oz fresh lime juice\n0.75 oz simple syrup\nIce', instructions: 'Shake all ingredients vigorously with ice until the shaker is ice cold. Double-strain into a chilled coupe. Perfectly balanced, elegant, and refreshing.', garnish: 'Lime wheel', flavor: 'Tart, clean, refreshing', alcoholic: true, likes: 172 },
  { id: 'c55', name: 'Mai Tai', author: 'Sam L.', glass: 'Rocks', difficulty: 'Medium', ingredients: '1 oz white rum\n1 oz dark rum\n0.5 oz orgeat syrup\n0.5 oz orange curaçao\n0.75 oz fresh lime juice\nCrushed ice', instructions: 'Shake white rum, orange curaçao, orgeat, and lime juice with ice. Strain over crushed ice. Float the dark rum on top by pouring slowly over the back of a spoon.', garnish: 'Mint sprig, lime wheel, cherry', flavor: 'Tropical, nutty, fruity', alcoholic: true, likes: 156 },
  { id: 'c56', name: 'Zombie', author: 'Riley K.', glass: 'Hurricane', difficulty: 'Hard', ingredients: '1 oz white rum\n1 oz golden rum\n1 oz dark rum\n0.5 oz 151-proof rum\n0.5 oz lime juice\n1 oz orange juice\n0.5 oz grenadine\n0.5 oz passion fruit syrup', instructions: 'Shake all ingredients except 151 rum with ice. Strain into a hurricane glass filled with ice. Float 151 rum on top. Limit to two per customer — this is infamous for a reason.', garnish: 'Orange slice, cherry, mint', flavor: 'Potent, tropical, fruity', alcoholic: true, likes: 88 },
  { id: 'c57', name: 'Rum Punch', author: 'MixMaster', glass: 'Highball', difficulty: 'Easy', ingredients: '2 oz dark rum\n2 oz orange juice\n2 oz pineapple juice\n0.5 oz grenadine\n0.5 oz lime juice\nIce', instructions: 'Combine all ingredients in a shaker with ice. Shake well. Pour over fresh ice. Follow the classic formula: 1 sour, 2 sweet, 3 strong, 4 weak.', garnish: 'Orange slice, cherry, lime', flavor: 'Fruity, tropical, lively', alcoholic: true, likes: 104 },

  // ── TEQUILA CLASSICS ──
  { id: 'c58', name: 'Margarita', author: 'MixMaster', glass: 'Coupe', difficulty: 'Easy', ingredients: '2 oz tequila blanco\n1 oz Cointreau or triple sec\n0.75 oz fresh lime juice\nSalt for rim', instructions: 'Rim a coupe glass with salt. Shake tequila, Cointreau, and lime juice vigorously with ice. Double-strain into the rimmed glass. Adjust lime to taste.', garnish: 'Salted rim, lime wheel', flavor: 'Tart, citrusy, balanced', alcoholic: true, likes: 245 },
  { id: 'c59', name: 'Mexican Mule', author: 'Jamie C.', glass: 'Copper Mug', difficulty: 'Easy', ingredients: '2 oz tequila blanco\n0.5 oz fresh lime juice\n4 oz ginger beer\nIce', instructions: 'Fill a copper mug with ice. Add tequila and lime juice. Top with cold ginger beer and stir lightly. The tequila spin on the classic mule.', garnish: 'Lime wedge, cucumber slice', flavor: 'Spicy, citrusy, crisp', alcoholic: true, likes: 82 },

  // ── VODKA CLASSICS ──
  { id: 'c60', name: 'Cosmopolitan', author: 'MixMaster', glass: 'Martini', difficulty: 'Easy', ingredients: '1.5 oz citrus vodka\n0.5 oz Cointreau\n0.5 oz fresh lime juice\n1 oz cranberry juice', instructions: 'Shake all ingredients vigorously with ice. Double-strain into a chilled martini glass. The Cosmo should be a delicate pink — not dark red.', garnish: 'Flamed orange peel or lime wedge', flavor: 'Tart, citrusy, slightly sweet', alcoholic: true, likes: 163 },
  { id: 'c61', name: 'White Russian', author: 'Riley K.', glass: 'Rocks', difficulty: 'Easy', ingredients: '2 oz vodka\n1 oz Kahlua\n1 oz heavy cream\nIce', instructions: 'Fill a rocks glass with ice. Add vodka and Kahlua. Slowly pour heavy cream over the back of a spoon so it floats on top. Stir to combine or drink layered.', garnish: 'None', flavor: 'Creamy, coffee, rich', alcoholic: true, likes: 137 },
  { id: 'c62', name: 'French Martini', author: 'Alex M.', glass: 'Martini', difficulty: 'Easy', ingredients: '2 oz vodka\n0.5 oz Chambord\n1 oz fresh pineapple juice', instructions: 'Shake all ingredients vigorously with ice — really shake hard to get that foamy top. Double-strain into a chilled martini glass. The foam on top is the signature.', garnish: 'Fresh raspberry, lemon twist', flavor: 'Fruity, slightly sweet, elegant', alcoholic: true, likes: 118 },
  { id: 'c63', name: 'Appletini', author: 'Sam L.', glass: 'Martini', difficulty: 'Easy', ingredients: '2 oz vodka\n1 oz sour apple schnapps\n0.5 oz triple sec\n0.5 oz fresh lime juice', instructions: 'Shake all ingredients with ice. Double-strain into a chilled martini glass. Adjust sweetness with the schnapps — more for sweeter, less for tarter.', garnish: 'Apple slice, sugar rim optional', flavor: 'Sweet, tart, apple', alcoholic: true, likes: 94 },
  { id: 'c64', name: 'Lemon Drop Martini', author: 'Jamie C.', glass: 'Martini', difficulty: 'Easy', ingredients: '2 oz citrus vodka\n0.75 oz Cointreau\n1 oz fresh lemon juice\n0.5 oz simple syrup\nSugar rim', instructions: 'Rim a martini glass with sugar. Shake all ingredients vigorously with ice. Double-strain into the sugared glass. Much more refined than the shot version.', garnish: 'Sugar rim, lemon twist', flavor: 'Bright, tart, citrusy', alcoholic: true, likes: 109 },

  // ── CHAMPAGNE & WINE ──
  { id: 'c65', name: 'Champagne Cocktail', author: 'MixMaster', glass: 'Flute', difficulty: 'Easy', ingredients: '1 sugar cube\n2 dashes Angostura bitters\n5 oz chilled champagne\nBrandy (optional, 0.5 oz)', instructions: 'Place a sugar cube in a champagne flute. Saturate it with Angostura bitters. Add brandy if using. Slowly pour cold champagne over. The sugar cube will slowly dissolve and bubble.', garnish: 'Lemon twist, Maraschino cherry', flavor: 'Delicate, bubbly, slightly bitter', alcoholic: true, likes: 76 },
  { id: 'c66', name: 'Kir Royale', author: 'Riley K.', glass: 'Flute', difficulty: 'Easy', ingredients: '0.5 oz crème de cassis\n5 oz chilled champagne or prosecco', instructions: 'Pour crème de cassis into a champagne flute. Slowly top with cold champagne. The cassis sinks and creates a beautiful gradient. No stirring needed.', garnish: 'Raspberry, blackberry', flavor: 'Berry, elegant, sparkling', alcoholic: true, likes: 58 },

  // ── MEZCAL & SPECIALTY ──
  { id: 'c67', name: 'Mezcal Negroni', author: 'Alex M.', glass: 'Rocks', difficulty: 'Easy', ingredients: '1 oz mezcal\n1 oz sweet vermouth\n1 oz Campari\nIce', instructions: 'Stir all ingredients with ice in a mixing glass for 30 seconds. Strain into a rocks glass over a large ice cube. The mezcal adds an irresistible smoky depth to the classic Negroni.', garnish: 'Orange peel', flavor: 'Smoky, bitter, complex', alcoholic: true, likes: 79 },
  { id: 'c68', name: 'Naked & Famous', author: 'Sam L.', glass: 'Coupe', difficulty: 'Medium', ingredients: '0.75 oz mezcal\n0.75 oz Aperol\n0.75 oz yellow Chartreuse\n0.75 oz fresh lime juice', instructions: 'Shake all equal-parts ingredients with ice. Double-strain into a chilled coupe. A smoky, modern riff on the Paper Plane. Complex and perfectly balanced.', garnish: 'None or lime twist', flavor: 'Smoky, herbal, bittersweet', alcoholic: true, likes: 51 },
  { id: 'c69', name: 'Penicillin', author: 'Jamie C.', glass: 'Rocks', difficulty: 'Medium', ingredients: '2 oz blended Scotch whisky\n0.75 oz fresh lemon juice\n0.75 oz honey-ginger syrup\n0.25 oz Islay Scotch (float)', instructions: 'Shake blended Scotch, lemon juice, and honey-ginger syrup with ice. Strain into a rocks glass over a large ice cube. Float the peaty Islay Scotch on top. A modern classic by Sam Ross.', garnish: 'Candied ginger, lemon twist', flavor: 'Smoky, sweet, spicy, citrusy', alcoholic: true, likes: 68 },
];

// ── GLASS SHAPES ──────────────────────────────────
const GLASSES = {
  Highball:  { svg: 'M 22,10 L 138,10 L 134,250 L 26,250 Z', clip: 'polygon(13.75% 3.85%, 86.25% 3.85%, 83.75% 96.15%, 16.25% 96.15%)' },
  Rocks:     { svg: 'M 14,100 L 146,100 L 144,250 L 16,250 Z', clip: 'polygon(8.75% 38.46%, 91.25% 38.46%, 90% 96.15%, 10% 96.15%)' },
  Martini:   { svg: 'M 3,18 L 157,18 L 93,210 L 93,250 L 67,250 L 67,210 Z', clip: 'polygon(1.875% 6.92%, 98.125% 6.92%, 58.125% 80.77%, 41.875% 80.77%)' },
  Shot:      { svg: 'M 42,52 L 118,52 L 115,222 L 45,222 Z', clip: 'polygon(26.25% 20%, 73.75% 20%, 71.875% 85.38%, 28.125% 85.38%)' },
  Copa:      { svg: 'M 30,15 C 30,15 15,90 18,120 C 20,150 50,155 80,155 C 110,155 140,150 142,120 C 145,90 130,15 130,15 Z M 80,155 L 80,232 M 50,232 L 110,232', clip: 'polygon(11% 6%, 89% 6%, 93% 35%, 60% 60%, 40% 60%, 7% 35%)' },
  Flute:     { svg: 'M 58,10 L 102,10 L 98,250 L 62,250 Z', clip: 'polygon(36.25% 3.85%, 63.75% 3.85%, 61.25% 96.15%, 38.75% 96.15%)' },
  Hurricane: { svg: 'M 26,10 L 134,10 L 152,115 L 130,250 L 30,250 L 8,115 Z', clip: 'polygon(16.25% 3.85%, 83.75% 3.85%, 95% 44.23%, 81.25% 96.15%, 18.75% 96.15%, 5% 44.23%)' },
  Mug:       { svg: 'M 14,15 L 128,15 L 128,250 L 14,250 Z M 128,75 Q 156,75 156,132 Q 156,190 128,190', clip: 'polygon(8.75% 5.77%, 80% 5.77%, 80% 96.15%, 8.75% 96.15%)' },
};

// ── INGREDIENT COLORS ─────────────────────────────
const INGREDIENT_COLORS = {
  vodka:'#d8eef8bb','white rum':'#f0f0e8bb',rum:'#e8d4a0bb','dark rum':'#7a3a0edd',
  'aged rum':'#8a4c1add','coconut rum':'#fff0d8bb',gin:'#dcecdecc',tequila:'#ddecd8cc',
  mezcal:'#d8c078cc',whiskey:'#b86820dd',whisky:'#b86820dd',bourbon:'#a84e14dd',
  scotch:'#964212dd',brandy:'#904818dd',cognac:'#a05828dd',champagne:'#f4e8b0cc',
  prosecco:'#f0e4b0cc',wine:'#8e0e1add','red wine':'#8e0e1add','white wine':'#eae8c8cc',
  vermouth:'#d8d0a8cc','dry vermouth':'#dcd8b8cc','sweet vermouth':'#b83838dd',
  'triple sec':'#e07800dd',cointreau:'#e07800dd','grand marnier':'#cc5c10dd',
  kahlua:'#1e0800ee',baileys:'#b89058dd',amaretto:'#b05010dd','blue curacao':'#0064eecc',
  'peach schnapps':'#ffaa60cc',grenadine:'#be002edd',aperol:'#ee4800dd',campari:'#cc0800dd',
  'orange juice':'#e87800cc','pineapple juice':'#dcc000cc','cranberry juice':'#be0830cc',
  'lime juice':'#88be18cc','lemon juice':'#e0dc18cc','grapefruit juice':'#e85430cc',
  'tomato juice':'#bc1e0acc','apple juice':'#b8bc18cc','coconut cream':'#f8f0e0cc',
  'peach purée':'#ffaa60cc','passion fruit syrup':'#d89800cc',
  cola:'#241000ee','soda water':'#c8e8fcaa','sparkling water':'#c8e8fcaa',
  'tonic water':'#ccecd8aa','ginger beer':'#ccb860cc','ginger ale':'#d8cc88cc',
  lemonade:'#f4f070cc','lemon-lime soda':'#d8e860cc',
  'simple syrup':'#fff4c0aa','sugar syrup':'#ffecb0aa',honey:'#cc8820dd',
  agave:'#ccc058cc',cream:'#fff4e8aa','heavy cream':'#ffecd8aa',milk:'#fffff0aa',
  'egg white':'#f4f4e8aa',egg:'#f4f4e8aa',
  'angostura bitters':'#7a2808dd',bitters:'#7a2808dd',peychaud:'#b82838dd',
  ice:'#c0e0f0aa',water:'#c8e8ffaa',espresso:'#221000ee',coffee:'#301400ee',
  tea:'#a87850cc','iced tea':'#886018cc',worcestershire:'#342010dd',tabasco:'#c01400dd',
  _default:'#8b7355cc',
};

// ── GLASS VIZ UTILITIES ───────────────────────────
const DECORATIVE_WORDS = ['wedge','slice','sprig','cherry','maraschino','olive','umbrella','straw','zest','twist','peel','wheel','salt rim','sugar rim','toasted','candied'];
function isDecorative(name) {
  const l = (name||'').toLowerCase();
  return DECORATIVE_WORDS.some(k => l.includes(k));
}
function parseMeasureOz(measure) {
  if (!measure) return 1;
  const s = measure.toLowerCase();
  const oz = s.match(/([\d.]+)\s*oz/); if (oz) return parseFloat(oz[1]);
  const fr = s.match(/(\d+)\s*\/\s*(\d+)\s*oz/); if (fr) return +fr[1] / +fr[2];
  if (s.includes('½')) return 0.5; if (s.includes('¼')) return 0.25;
  if (s.includes('¾')) return 0.75; if (s.includes('⅓')) return 0.33;
  if (s.includes('tbsp')) return 0.45; if (s.includes('tsp')) return 0.15;
  if (s.includes('dash')) return 0.08; if (s.includes('splash')) return 0.25;
  const ml = s.match(/([\d.]+)\s*ml/); if (ml) return parseFloat(ml[1]) / 30;
  const cl = s.match(/([\d.]+)\s*cl/); if (cl) return parseFloat(cl[1]) / 3;
  return 1;
}
function calcLayerPcts(pourable) {
  const MIN = 13; // minimum % so the label is always readable
  const amounts = pourable.map(i => parseMeasureOz(i.measure));
  const rawTotal = amounts.reduce((s, a) => s + a, 0) || pourable.length;
  const withMin  = amounts.map(a => Math.max((a / rawTotal) * 100, MIN));
  const total    = withMin.reduce((s, p) => s + p, 0);
  return withMin.map(p => (p / total) * 100);
}
function getIngColor(name) {
  const l = (name||'').toLowerCase().trim();
  if (INGREDIENT_COLORS[l]) return INGREDIENT_COLORS[l];
  for (const [k,v] of Object.entries(INGREDIENT_COLORS)) {
    if (k === '_default') continue;
    if (l.includes(k) || k.includes(l)) return v;
  }
  return INGREDIENT_COLORS._default;
}
function parseIngsText(text) {
  return (text||'').split('\n').map(l=>l.trim()).filter(Boolean).map(line => {
    const m = line.match(/^([\d.\/½¼¾]+\s*(?:oz|cl|ml|tsp|tbsp|cups?|dashes?|splash|pinch)\s+)?(.+)$/i);
    return { name: ((m&&m[2])||line).trim().toLowerCase(), measure: ((m&&m[1])||'').trim() };
  });
}
function normalizeGlassName(name) {
  const n = (name||'').toLowerCase();
  if (n.includes('martini')) return 'Martini';
  if (n.includes('shot')) return 'Shot';
  if (n.includes('hurricane')) return 'Hurricane';
  if (n.includes('copa')||n.includes('goblet')||n.includes('wine')||n.includes('coupe')) return 'Copa';
  if (n.includes('flute')||n.includes('champagne')) return 'Flute';
  if (n.includes('rocks')||n.includes('old fashioned')||n.includes('lowball')) return 'Rocks';
  if (n.includes('mug')||n.includes('copper')) return 'Mug';
  return 'Highball';
}
function setGlassShape(svgId, innerId, glassType) {
  const g = GLASSES[glassType] || GLASSES.Highball;
  const inner = document.getElementById(innerId);
  const svgEl = document.getElementById(svgId);
  if (!inner || !svgEl) return;
  inner.style.clipPath = g.clip;
  svgEl.innerHTML = `<path d="${g.svg}" stroke="rgba(217,119,6,.62)" stroke-width="2.5" fill="rgba(217,119,6,.04)" stroke-linejoin="round" stroke-linecap="round"/>`;
}

let _glassAnims = [];
function animateGlassViz(ingObjs, glassType, svgId, innerId, streamId, legendId) {
  _glassAnims.forEach(clearTimeout); _glassAnims = [];
  setGlassShape(svgId, innerId, glassType);
  const inner  = document.getElementById(innerId);
  const stream = document.getElementById(streamId);
  const legend = document.getElementById(legendId);
  if (!inner) return;
  inner.innerHTML = ''; if (legend) legend.innerHTML = '';
  const pourable = ingObjs.filter(i => !isDecorative(i.name));
  if (!pourable.length) { if (legend) legend.innerHTML = '<p class="viz-hint">No liquid ingredients found</p>'; return; }
  const pcts = calcLayerPcts(pourable);
  pourable.forEach((ing, i) => {
    const t = setTimeout(() => {
      const col = getIngColor(ing.name);
      if (stream) {
        stream.style.background = col;
        stream.style.boxShadow = `0 0 10px ${col}, 0 0 22px ${col}`;
        stream.classList.remove('hidden','falling');
        void stream.offsetWidth;
        stream.classList.add('falling');
        _glassAnims.push(setTimeout(() => { stream.classList.add('hidden'); stream.classList.remove('falling'); }, 780));
      }
      const layer = document.createElement('div');
      layer.className = 'liq-layer';
      layer.style.background = col;
      layer.style.height = '0%';
      if (ing.measure) layer.innerHTML = `<span class="liq-measure">${ing.measure}</span>`;
      inner.appendChild(layer);
      requestAnimationFrame(() => requestAnimationFrame(() => { layer.style.height = `${pcts[i]}%`; }));
      if (legend) {
        const hint = legend.querySelector('.viz-hint'); if (hint) hint.remove();
        const li = document.createElement('div'); li.className = 'legend-item';
        li.innerHTML = `<span class="legend-swatch" style="background:${col}"></span><span>${ing.name}</span>`;
        legend.appendChild(li);
      }
    }, i * 780);
    _glassAnims.push(t);
  });
}

function renderGlassViz(ingObjs, glassType) {
  setGlassShape('glassSvg', 'glassInner', glassType);
  const inner  = document.getElementById('glassInner');
  const legend = document.getElementById('glassLegend');
  const stream = document.getElementById('pourStream');
  if (!inner) return;
  const pourable = ingObjs.filter(i => !isDecorative(i.name));
  if (!pourable.length) {
    inner.innerHTML = '';
    if (legend) legend.innerHTML = '<p class="viz-hint">Add ingredients above</p>';
    return;
  }
  const prev = inner.querySelectorAll('.liq-layer').length;
  const pcts = calcLayerPcts(pourable);
  inner.innerHTML = ''; if (legend) legend.innerHTML = '';
  pourable.forEach((ing, i) => {
    const col = getIngColor(ing.name);
    const layer = document.createElement('div'); layer.className = 'liq-layer';
    layer.style.background = col;
    layer.style.height = `${pcts[i]}%`;
    if (ing.measure) layer.innerHTML = `<span class="liq-measure">${ing.measure}</span>`;
    inner.appendChild(layer);
    if (legend) {
      const li = document.createElement('div'); li.className = 'legend-item';
      li.innerHTML = `<span class="legend-swatch" style="background:${col}"></span><span>${ing.name}</span>`;
      legend.appendChild(li);
    }
  });
  if (pourable.length > prev && stream) {
    const col = getIngColor(pourable[pourable.length-1].name);
    stream.style.background = col; stream.style.boxShadow = `0 0 10px ${col}`;
    stream.classList.remove('hidden','falling'); void stream.offsetWidth;
    stream.classList.add('falling');
    setTimeout(() => { stream.classList.add('hidden'); stream.classList.remove('falling'); }, 780);
  }
}

// ── STATE ──────────────────────────────────────────
const state = {
  user: null,
  favorites: [],
  inventory: [],
  myRecipes: [],
  ingredients: [],
  currentPage: 'home',
  exploreResults: [],
  exploreQuery: '',
  exploreCategory: 'all',
  exploreSpirit: '',
  communityTab: 'all',
  barTab: 'favorites',
};

// ── LOCAL STORAGE ──────────────────────────────────
function save() {
  localStorage.setItem('mm_user',      JSON.stringify(state.user));
  localStorage.setItem('mm_favorites', JSON.stringify(state.favorites));
  localStorage.setItem('mm_inventory', JSON.stringify(state.inventory));
  localStorage.setItem('mm_recipes',   JSON.stringify(state.myRecipes));
}
function load() {
  state.user      = JSON.parse(localStorage.getItem('mm_user')      || 'null');
  state.favorites = JSON.parse(localStorage.getItem('mm_favorites') || '[]');
  state.inventory = JSON.parse(localStorage.getItem('mm_inventory') || '[]');
  state.myRecipes = JSON.parse(localStorage.getItem('mm_recipes')   || '[]');
}

// ── FETCH HELPERS ──────────────────────────────────
async function api(endpoint) {
  try {
    const r = await fetch(`${API}/${endpoint}`);
    const d = await r.json();
    return d;
  } catch { return null; }
}
const searchDrinks   = q => api(`search.php?s=${encodeURIComponent(q)}`).then(d => d?.drinks || []);
const getRandom      = ()  => api('random.php').then(d => d?.drinks?.[0] || null);
const lookupById     = id  => api(`lookup.php?i=${id}`).then(d => d?.drinks?.[0] || null);
const filterByIng    = i   => api(`filter.php?i=${encodeURIComponent(i)}`).then(d => d?.drinks || []);
const filterByCat    = c   => api(`filter.php?c=${encodeURIComponent(c)}`).then(d => d?.drinks || []);
const filterByAlc    = a   => api(`filter.php?a=${encodeURIComponent(a)}`).then(d => d?.drinks || []);

// Convert a community recipe to the same shape drinkCard() expects
function commToExploreCard(r) {
  return {
    idDrink: r.id,
    strDrink: r.name,
    strDrinkThumb: '',
    strAlcoholic: r.alcoholic ? 'Alcoholic' : 'Non alcoholic',
    strCategory: r.flavor || 'Community',
    strGlass: r.glass || '',
    _ingredients: r.ingredients || '',
    _glass: r.glass || 'Highball',
  };
}

// Build a static mini glass visualization HTML string for a card thumbnail
function miniGlassViz(ingredientsText, glassType) {
  const ingObjs = parseIngsText(ingredientsText);
  const pourable = ingObjs.filter(i => !isDecorative(i.name));
  const g = GLASSES[normalizeGlassName(glassType)] || GLASSES.Highball;

  let layersHtml = '';
  if (pourable.length) {
    const pcts = calcLayerPcts(pourable);
    layersHtml = pourable.map((ing, i) => {
      const col = getIngColor(ing.name);
      return `<div style="height:${pcts[i]}%;background:${col};width:100%;flex-shrink:0;position:relative;overflow:hidden"><span class="mini-shimmer"></span></div>`;
    }).join('');
  }

  return `<div class="card-mini-glass">
    <div class="card-mini-wrap">
      <div class="card-mini-liq" style="clip-path:${g.clip}">
        <div style="display:flex;flex-direction:column-reverse;height:100%">${layersHtml}</div>
      </div>
      <svg class="card-mini-svg" viewBox="0 0 160 260">
        <path d="${g.svg}" stroke="rgba(217,119,6,.78)" stroke-width="3" fill="rgba(217,119,6,.05)" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>`;
}

// Filter all community + user recipes by spirit keywords
function communityBySpirit(spirit) {
  const keywords = (SPIRIT_SYNONYMS[spirit] || [spirit]).map(s => s.toLowerCase());
  return [...SAMPLE_COMMUNITY, ...state.myRecipes]
    .filter(r => keywords.some(k => (r.ingredients || '').toLowerCase().includes(k)))
    .map(commToExploreCard);
}

// Route a drink ID to the right modal (community vs API)
function openDrink(id) {
  if (!id) return;
  if (!/^\d+$/.test(id)) {
    const recipe = [...SAMPLE_COMMUNITY, ...state.myRecipes].find(r => r.id === id);
    if (recipe) openCommRecipeModal(recipe);
  } else {
    openModal(id);
  }
}

// Each spirit maps to multiple API ingredient names so filter.php returns full results
const SPIRIT_SYNONYMS = {
  Vodka:     ['Vodka'],
  Rum:       ['Rum', 'White Rum', 'Dark Rum', 'Coconut Rum', 'Aged rum'],
  Gin:       ['Gin'],
  Tequila:   ['Tequila', 'Blended Tequila'],
  Whiskey:   ['Whiskey', 'Bourbon', 'Scotch', 'Rye Whiskey', 'Blended Whiskey'],
  Bourbon:   ['Bourbon', 'Whiskey', 'Rye Whiskey'],
  Mezcal:    ['Mezcal'],
  Champagne: ['Champagne', 'Prosecco', 'Sparkling wine'],
};

// Extract drink ingredients as array
function getDrinkIngredients(drink) {
  const ings = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    if (ing?.trim()) ings.push({ name: ing.trim(), measure: (drink[`strMeasure${i}`] || '').trim() });
  }
  return ings;
}

// ── ROUTING ───────────────────────────────────────
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(`page-${page}`);
  if (el) { el.classList.remove('hidden'); el.scrollIntoView({ behavior: 'instant', block: 'start' }); }

  document.querySelectorAll('[data-nav]').forEach(b => {
    b.classList.toggle('active', b.dataset.nav === page);
  });

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');

  state.currentPage = page;
  window.scrollTo({ top: 0 });

  if (page !== 'ai-bartender') stopAIBubbles();

  switch (page) {
    case 'home':         initHome(); break;
    case 'explore':      initExplore(); break;
    case 'community':    renderCommunity(); break;
    case 'my-bar':       renderMyBar(); break;
    case 'profile':      renderProfile(); break;
    case 'ai-bartender': renderIngGrid(); initAIBubbles(); break;
  }
}

// ── DRINK CARD ─────────────────────────────────────
function drinkCard(drink, opts = {}) {
  const isFav = state.favorites.some(f => f.idDrink === drink.idDrink);
  const isAlc = drink.strAlcoholic === 'Alcoholic';
  const imgSrc = drink.strDrinkThumb || '';
  const matchPct = opts.matchPct;
  const missing = opts.missing || [];
  const imgHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${drink.strDrink}" loading="lazy">`
    : drink._ingredients
      ? miniGlassViz(drink._ingredients, drink._glass || drink.strGlass || 'Highball')
      : `<div class="card-mini-glass"><svg viewBox="0 0 24 24" fill="none" stroke="rgba(217,119,6,.35)" stroke-width="1.5" style="width:44px;height:44px"><path d="M9 3h6l1 5H8L9 3z"/><path d="M8 8c0 4-3 5-3 9a7 7 0 0 0 14 0c0-4-3-5-3-9"/><line x1="8" y1="13" x2="16" y2="13"/></svg></div>`;

  return `
    <div class="drink-card" data-open="${drink.idDrink || ''}" role="button" tabindex="0" aria-label="${drink.strDrink}">
      <div class="drink-card-img">
        ${imgHtml}
        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${drink.idDrink}" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        ${drink.strAlcoholic ? `<span class="alc-badge ${isAlc ? 'alcoholic' : 'nonalc'}">${isAlc ? '🍹 Alc' : '🥤 Non-Alc'}</span>` : ''}
        ${matchPct !== undefined ? `<span class="match-badge">${matchPct}%</span>` : ''}
      </div>
      <div class="drink-card-body">
        <h3 class="drink-name">${drink.strDrink}</h3>
        <div class="drink-meta">
          ${drink.strCategory ? `<span class="drink-meta-tag">${drink.strCategory}</span>` : ''}
          ${drink.strGlass ? `<span class="drink-meta-tag">${drink.strGlass}</span>` : ''}
        </div>
        ${missing.length > 0 ? `<p class="drink-missing">Needs: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '…' : ''}</p>` : ''}
      </div>
    </div>`;
}

function skeletons(n) {
  return Array.from({ length: n }, () => `
    <div class="skeleton-card">
      <div class="skeleton-img" style="aspect-ratio:1;background:rgba(255,255,255,.04);position:relative;overflow:hidden"><div class="shimmer"></div></div>
      <div class="skeleton-body">
        <div class="skeleton-line" style="width:70%;height:12px;background:rgba(255,255,255,.05);border-radius:6px;margin-bottom:8px"></div>
        <div class="skeleton-line" style="width:45%;height:10px;background:rgba(255,255,255,.04);border-radius:6px"></div>
      </div>
    </div>`).join('');
}

// ── FAVORITES ─────────────────────────────────────
function toggleFav(drink) {
  const idx = state.favorites.findIndex(f => f.idDrink === drink.idDrink);
  if (idx === -1) {
    state.favorites.unshift({ idDrink: drink.idDrink, strDrink: drink.strDrink, strDrinkThumb: drink.strDrinkThumb, strCategory: drink.strCategory, strAlcoholic: drink.strAlcoholic, strGlass: drink.strGlass });
    toast(`${drink.strDrink} added to favorites!`, 'success');
  } else {
    state.favorites.splice(idx, 1);
    toast('Removed from favorites', 'info');
  }
  save();
  // Update all buttons for this drink ID
  document.querySelectorAll(`[data-fav="${drink.idDrink}"]`).forEach(btn => {
    const fav = state.favorites.some(f => f.idDrink === drink.idDrink);
    btn.classList.toggle('active', fav);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', fav ? 'currentColor' : 'none');
  });
  if (state.currentPage === 'my-bar') renderFavorites();
  if (state.currentPage === 'profile') renderProfile();
}

// ── TOAST ─────────────────────────────────────────
function toast(msg, type = 'info') {
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 350);
  }, 3200);
}

// ── HOME PAGE ─────────────────────────────────────
let _trending = null;
let _randoms  = null;
let _featured = null;

async function initHome() {
  // Featured hero drink
  if (!_featured) {
    _featured = await getRandom();
  }
  renderFeatured(_featured);

  // Trending
  const tEl = document.getElementById('trendingGrid');
  if (!_trending) {
    tEl.innerHTML = skeletons(6);
    const results = await Promise.all(TRENDING.map(q => searchDrinks(q)));
    _trending = results.flatMap(r => r.slice(0, 1));
  }
  tEl.innerHTML = _trending.map(d => drinkCard(d)).join('');

  // Random
  const rEl = document.getElementById('randomGrid');
  if (!_randoms) {
    rEl.innerHTML = skeletons(4);
    const rs = await Promise.all(Array.from({ length: 4 }, getRandom));
    _randoms = rs.filter(Boolean);
  }
  rEl.innerHTML = _randoms.map(d => drinkCard(d)).join('');
}

function renderFeatured(drink) {
  const el = document.getElementById('heroVisual');
  if (!drink) return;
  const isFav = state.favorites.some(f => f.idDrink === drink.idDrink);
  el.innerHTML = `
    <div class="featured-card" data-open="${drink.idDrink}">
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
      <div class="featured-overlay">
        <span class="featured-label">✦ Featured Tonight</span>
        <h3>${drink.strDrink}</h3>
        <div class="featured-tags">
          ${drink.strCategory ? `<span class="tag">${drink.strCategory}</span>` : ''}
          ${drink.strGlass ? `<span class="tag">${drink.strGlass}</span>` : ''}
        </div>
        <button class="btn-primary" data-open="${drink.idDrink}">View Recipe</button>
      </div>
    </div>`;
}

document.getElementById('homeRandomBtn').addEventListener('click', async () => {
  const rEl = document.getElementById('randomGrid');
  rEl.innerHTML = skeletons(4);
  const rs = await Promise.all(Array.from({ length: 4 }, getRandom));
  _randoms = rs.filter(Boolean);
  rEl.innerHTML = _randoms.map(d => drinkCard(d)).join('');
});

document.getElementById('randomTopBtn').addEventListener('click', async () => {
  const drink = await getRandom();
  if (drink) openModal(drink.idDrink);
});

// ── EXPLORE ───────────────────────────────────────
let _exploreLoaded = false;
let _exploreAll = [];
let _exploreVisible = 12;

async function initExplore() {
  if (!_exploreLoaded) {
    await loadExplore();
    _exploreLoaded = true;
  } else {
    renderExploreGrid();
  }
}

async function loadExplore() {
  const grid = document.getElementById('exploreGrid');
  grid.innerHTML = skeletons(12);

  let drinks = [];
  if (state.exploreQuery) {
    const apiResults = await searchDrinks(state.exploreQuery);
    const q = state.exploreQuery.toLowerCase();
    const commResults = [...SAMPLE_COMMUNITY, ...state.myRecipes]
      .filter(r => r.name.toLowerCase().includes(q) || (r.ingredients || '').toLowerCase().includes(q))
      .map(commToExploreCard);
    const apiIds = new Set(apiResults.map(d => d.idDrink));
    drinks = [...apiResults, ...commResults.filter(d => !apiIds.has(d.idDrink))];
  } else if (state.exploreSpirit) {
    const synonyms = SPIRIT_SYNONYMS[state.exploreSpirit] || [state.exploreSpirit];
    const batches = await Promise.all(synonyms.map(s => filterByIng(s)));
    const seen = new Set();
    const apiDrinks = batches.flat().filter(d => {
      if (seen.has(d.idDrink)) return false;
      seen.add(d.idDrink); return true;
    });
    const commDrinks = communityBySpirit(state.exploreSpirit).filter(d => !seen.has(d.idDrink));
    drinks = [...apiDrinks, ...commDrinks];
  } else if (state.exploreCategory !== 'all') {
    if (state.exploreCategory === 'Non alcoholic') {
      drinks = await filterByAlc('Non_Alcoholic');
    } else {
      drinks = await filterByCat(state.exploreCategory);
    }
  } else {
    const [cocktails, classics] = await Promise.all([filterByCat('Cocktail'), filterByCat('Ordinary Drink')]);
    const commAll = [...SAMPLE_COMMUNITY, ...state.myRecipes].map(commToExploreCard);
    drinks = shuffle([...cocktails, ...classics, ...commAll]).slice(0, 80);
  }

  _exploreAll = drinks;
  _exploreVisible = 12;
  renderExploreGrid();
}

function renderExploreGrid() {
  const grid = document.getElementById('exploreGrid');
  const sentinel = document.getElementById('exploreSentinel');
  if (!_exploreAll.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>No drinks found. Try a different search!</p></div>`;
    if (sentinel) sentinel.innerHTML = '';
    return;
  }
  const showing = _exploreAll.slice(0, _exploreVisible);
  grid.innerHTML = showing.map(d => drinkCard(d)).join('');
  if (sentinel) {
    sentinel.innerHTML = _exploreAll.length > _exploreVisible
      ? '<div class="loading-dots"><span></span><span></span><span></span></div>'
      : '';
  }
}

// Infinite scroll — fires when sentinel scrolls into view
const _exploreObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && _exploreAll.length > _exploreVisible) {
    _exploreVisible += 12;
    renderExploreGrid();
  }
}, { rootMargin: '300px' });
_exploreObserver.observe(document.getElementById('exploreSentinel'));

// Explore search
let exploreDebounce;
document.getElementById('exploreSearchInput').addEventListener('input', e => {
  const val = e.target.value.trim();
  document.getElementById('clearExplore').classList.toggle('hidden', !val);
  clearTimeout(exploreDebounce);
  exploreDebounce = setTimeout(async () => {
    state.exploreQuery = val;
    _exploreLoaded = false;
    await loadExplore();
  }, 500);
});
document.getElementById('clearExplore').addEventListener('click', () => {
  document.getElementById('exploreSearchInput').value = '';
  document.getElementById('clearExplore').classList.add('hidden');
  state.exploreQuery = '';
  _exploreLoaded = false;
  loadExplore();
});

// Category filter tabs
document.getElementById('categoryFilters').addEventListener('click', async e => {
  const tab = e.target.closest('.ftab');
  if (!tab) return;
  document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  state.exploreCategory = tab.dataset.cat;
  state.exploreSpirit = '';
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.spirit === ''));
  _exploreLoaded = false;
  await loadExplore();
});

// Spirit chips
document.getElementById('spiritChips').addEventListener('click', async e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  state.exploreSpirit = chip.dataset.spirit;
  _exploreLoaded = false;
  await loadExplore();
});

document.getElementById('loadMoreBtn').addEventListener('click', () => {
  _exploreVisible += 12;
  renderExploreGrid();
});

// Topbar global search
let topbarDebounce;
document.getElementById('topbarInput').addEventListener('input', e => {
  const val = e.target.value.trim();
  clearTimeout(topbarDebounce);
  if (!val) return;
  topbarDebounce = setTimeout(() => {
    state.exploreQuery = val;
    state.exploreCategory = 'all';
    state.exploreSpirit = '';
    _exploreLoaded = false;
    document.getElementById('exploreSearchInput').value = val;
    goTo('explore');
  }, 600);
});

// ── AI BARTENDER BUBBLE BACKGROUND ───────────────
let _bubbleAnimId = null;

function initAIBubbles() {
  const canvas = document.getElementById('aiBgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function makeBubble(startScattered) {
    const r = 6 + Math.random() * 72;
    return {
      x:       Math.random() * canvas.width,
      y:       startScattered ? Math.random() * canvas.height : canvas.height + r + 10,
      r,
      speed:   0.25 + Math.random() * 0.65,
      drift:   (Math.random() - 0.5) * 0.35,
      alpha:   0.05 + Math.random() * 0.11,
      pulse:   Math.random() * Math.PI * 2,
    };
  }

  resize();
  const bubbles = Array.from({ length: 22 }, () => makeBubble(true));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(b => {
      b.y     -= b.speed;
      b.x     += b.drift;
      b.pulse += 0.018;

      if (b.y + b.r < 0) Object.assign(b, makeBubble(false));

      const a = b.alpha + Math.sin(b.pulse) * 0.018;

      // Bubble body — radial gradient from bright centre to transparent edge
      const grad = ctx.createRadialGradient(
        b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.08,
        b.x, b.y, b.r
      );
      grad.addColorStop(0,   `rgba(251,191,36,${a * 1.4})`);
      grad.addColorStop(0.45,`rgba(217,119,6,${a * 0.55})`);
      grad.addColorStop(1,   `rgba(6,4,10,${a * 0.12})`);

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Rim
      ctx.strokeStyle = `rgba(217,119,6,${a * 2.2})`;
      ctx.lineWidth   = 1.2;
      ctx.stroke();

      // Specular highlight (top-left bright dot)
      ctx.beginPath();
      ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,230,140,${a * 1.6})`;
      ctx.fill();

      // Tiny secondary highlight
      ctx.beginPath();
      ctx.arc(b.x + b.r * 0.28, b.y + b.r * 0.1, b.r * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,210,80,${a * 0.9})`;
      ctx.fill();
    });

    _bubbleAnimId = requestAnimationFrame(draw);
  }

  if (_bubbleAnimId) cancelAnimationFrame(_bubbleAnimId);
  draw();

  window.addEventListener('resize', resize);
}

function stopAIBubbles() {
  if (_bubbleAnimId) { cancelAnimationFrame(_bubbleAnimId); _bubbleAnimId = null; }
}

// ── AI INGREDIENT CATEGORIES ──────────────────────
const AI_ING_CATS = [
  {
    name: 'Spirits',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6l1 5H8L9 3z"/><path d="M8 8c0 4-3 5-3 9a7 7 0 0 0 14 0c0-4-3-5-3-9"/><line x1="8" y1="13" x2="16" y2="13"/></svg>',
    items: ['Vodka','Gin','Rum','Tequila','Whiskey','Bourbon','Scotch','Mezcal','Brandy','Cognac','Champagne','Prosecco'],
  },
  {
    name: 'Liqueurs',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="M5 3h14l-2 8H7L5 3z"/></svg>',
    items: ['Triple sec','Cointreau','Kahlua','Baileys','Amaretto','Campari','Aperol','Blue Curacao','Peach schnapps','Grand Marnier','Chambord','Sweet vermouth','Dry vermouth','Absinthe'],
  },
  {
    name: 'Mixers',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12"/></svg>',
    items: ['Soda water','Tonic water','Ginger beer','Ginger ale','Cola','Lemonade','Coconut cream','Sparkling water','Cream','Heavy cream'],
  },
  {
    name: 'Juices',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 6-5 11-5 11S7 13 7 7a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/></svg>',
    items: ['Orange juice','Pineapple juice','Cranberry juice','Lime juice','Lemon juice','Grapefruit juice','Tomato juice','Apple juice'],
  },
  {
    name: 'Syrups & Sweeteners',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
    items: ['Simple syrup','Grenadine','Honey','Agave syrup','Orgeat','Sugar'],
  },
  {
    name: 'Fresh & Extras',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    items: ['Lime','Lemon','Orange','Mint','Egg white','Angostura bitters','Ice','Espresso','Worcestershire sauce','Tabasco'],
  },
];

function renderIngGrid() {
  const grid = document.getElementById('aiIngGrid');
  if (!grid) return;
  grid.innerHTML = AI_ING_CATS.map(cat => `
    <div class="ai-cat-section">
      <div class="ai-cat-header">
        <span class="ai-cat-icon">${cat.icon}</span>
        <span class="ai-cat-label">${cat.name}</span>
      </div>
      <div class="ai-cat-tiles">
        ${cat.items.map(item => {
          const key = item.toLowerCase();
          const col = getIngColor(key);
          const sel = state.ingredients.includes(key);
          return `<button class="ing-tile${sel ? ' selected' : ''}" data-ing="${key}" type="button" aria-label="${item}">
            <span class="ing-tile-tick"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5,5 4,7.5 8.5,2"/></svg></span>
            <img class="ing-tile-img" src="https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(item)}-Small.png" alt="${item}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <span class="ing-tile-dot" style="background:${col};display:none"></span>
            <span class="ing-tile-name">${item}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`).join('');
}

function syncIngTiles() {
  document.querySelectorAll('.ing-tile').forEach(tile => {
    tile.classList.toggle('selected', state.ingredients.includes(tile.dataset.ing));
  });
}

document.getElementById('aiIngGrid').addEventListener('click', e => {
  const tile = e.target.closest('.ing-tile');
  if (!tile) return;
  const ing = tile.dataset.ing;
  const idx = state.ingredients.indexOf(ing);
  if (idx === -1) state.ingredients.push(ing);
  else state.ingredients.splice(idx, 1);
  tile.classList.toggle('selected', idx === -1);
  renderChips();
});

// ── AI BARTENDER ──────────────────────────────────

// Ingredient chip management
function addIngredient(val) {
  const clean = val.trim().replace(/,/g, '');
  if (!clean || state.ingredients.includes(clean.toLowerCase())) return;
  state.ingredients.push(clean.toLowerCase());
  renderChips();
}

function removeIngredient(val) {
  state.ingredients = state.ingredients.filter(i => i !== val);
  renderChips();
}

function renderChips() {
  const list = document.getElementById('ingredientChipsList');
  const countEl = document.getElementById('aiSelCount');
  const count = state.ingredients.length;
  list.innerHTML = state.ingredients.map(i => `
    <span class="ing-chip">
      <span>${i}</span>
      <button class="ing-chip-remove" data-remove="${i}" aria-label="Remove ${i}">✕</button>
    </span>`).join('');
  if (countEl) countEl.textContent = count ? `${count} ingredient${count !== 1 ? 's' : ''} selected` : 'No ingredients selected';
  syncIngTiles();
}

// Flat list of all tile ingredient names for autocomplete
const ALL_ING_NAMES = AI_ING_CATS.flatMap(c => c.items);

function showSuggestions(val) {
  const box = document.getElementById('aiSuggestions');
  if (!val) { box.hidden = true; return; }
  const q = val.toLowerCase();
  const matches = ALL_ING_NAMES.filter(n => n.toLowerCase().includes(q) && !state.ingredients.includes(n.toLowerCase())).slice(0, 7);
  if (!matches.length) { box.hidden = true; return; }
  box.innerHTML = matches.map(m => `<div class="ai-sug-item" data-sug="${m}">${m}</div>`).join('');
  box.hidden = false;
}

document.getElementById('aiIngredientInput').addEventListener('input', e => {
  showSuggestions(e.target.value.trim());
});

document.getElementById('aiIngredientInput').addEventListener('keydown', e => {
  const val = e.target.value.trim();
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    if (val) { addIngredient(val); e.target.value = ''; document.getElementById('aiSuggestions').hidden = true; }
  } else if (e.key === 'Backspace' && !val && state.ingredients.length) {
    state.ingredients.pop();
    renderChips();
  } else if (e.key === 'Escape') {
    document.getElementById('aiSuggestions').hidden = true;
  }
});

document.getElementById('aiIngredientInput').addEventListener('blur', e => {
  setTimeout(() => { document.getElementById('aiSuggestions').hidden = true; }, 150);
  const val = e.target.value.trim();
  if (val) { addIngredient(val); e.target.value = ''; }
});

document.getElementById('aiSuggestions').addEventListener('mousedown', e => {
  const item = e.target.closest('[data-sug]');
  if (!item) return;
  e.preventDefault();
  addIngredient(item.dataset.sug);
  document.getElementById('aiIngredientInput').value = '';
  document.getElementById('aiSuggestions').hidden = true;
});

document.getElementById('ingredientChipsList').addEventListener('click', e => {
  const btn = e.target.closest('[data-remove]');
  if (btn) removeIngredient(btn.dataset.remove);
});


document.getElementById('clearIngredientsBtn').addEventListener('click', () => {
  state.ingredients = [];
  renderChips();
  document.getElementById('aiResults').classList.add('hidden');
  document.getElementById('aiEmpty').classList.add('hidden');
});

document.getElementById('findDrinksBtn').addEventListener('click', runAI);

async function runAI() {
  const ings = state.ingredients;
  document.getElementById('aiResults').classList.add('hidden');
  document.getElementById('aiEmpty').classList.add('hidden');
  document.getElementById('aiLoading').classList.add('hidden');

  if (!ings.length) {
    document.getElementById('aiEmpty').classList.remove('hidden');
    return;
  }

  document.getElementById('aiLoading').classList.remove('hidden');

  // Fetch drinks for each ingredient
  const sets = await Promise.all(ings.map(i => filterByIng(i).catch(() => [])));

  // Count matches per drink
  const counts = {};
  const drinkStore = {};
  sets.forEach(drinks => {
    drinks.forEach(d => {
      counts[d.idDrink] = (counts[d.idDrink] || 0) + 1;
      drinkStore[d.idDrink] = d;
    });
  });

  // Sort by match count descending
  const sorted = Object.entries(counts).sort(([,a],[,b]) => b - a).slice(0, 24);

  // Fetch full details for top candidates
  const details = await Promise.all(sorted.map(([id]) => lookupById(id).catch(() => null)));

  const userIngs = ings.map(i => i.toLowerCase());

  // Analyze API drinks
  const analyzed = details.filter(Boolean).map(drink => {
    const drinkIngs = getDrinkIngredients(drink).map(i => i.name.toLowerCase());
    const matched = drinkIngs.filter(di => userIngs.some(ui => fuzzyMatch(di, ui)));
    const missing = drinkIngs.filter(di => !userIngs.some(ui => fuzzyMatch(di, ui)));
    const pct = drinkIngs.length ? Math.round((matched.length / drinkIngs.length) * 100) : 0;
    return { drink, pct, missing: missing.map(m => capitalize(m)) };
  });

  // Analyze community drinks
  const commAnalyzed = [...SAMPLE_COMMUNITY, ...state.myRecipes].map(recipe => {
    const recipeIngs = parseIngsText(recipe.ingredients || '')
      .filter(i => !isDecorative(i.name))
      .map(i => i.name.toLowerCase());
    if (!recipeIngs.length) return null;
    const matched = recipeIngs.filter(ri => userIngs.some(ui => fuzzyMatch(ri, ui)));
    const missing = recipeIngs.filter(ri => !userIngs.some(ui => fuzzyMatch(ri, ui)));
    const pct = Math.round((matched.length / recipeIngs.length) * 100);
    if (pct === 0) return null;
    return { drink: commToExploreCard(recipe), pct, missing: missing.map(capitalize) };
  }).filter(Boolean);

  // Merge — skip community drinks already returned by API (same name)
  const apiNames = new Set(analyzed.map(a => a.drink.strDrink.toLowerCase()));
  const allAnalyzed = [...analyzed, ...commAnalyzed.filter(a => !apiNames.has(a.drink.strDrink.toLowerCase()))];

  // Group
  const perfect  = allAnalyzed.filter(d => d.pct >= 100);
  const near     = allAnalyzed.filter(d => d.pct >= 55 && d.pct < 100 && d.missing.length <= 3);
  const partial  = allAnalyzed.filter(d => d.pct > 0 && d.pct < 55).slice(0, 6);

  document.getElementById('aiLoading').classList.add('hidden');
  document.getElementById('aiResults').classList.remove('hidden');

  const pEl = document.getElementById('perfectGrid');
  const nEl = document.getElementById('nearGrid');
  const ptEl = document.getElementById('partialGrid');

  pEl.innerHTML  = perfect.length  ? perfect.map(d  => drinkCard(d.drink, { matchPct: d.pct })).join('')
                                    : `<p class="no-results-msg">No perfect matches — try adding more ingredients!</p>`;
  nEl.innerHTML  = near.length     ? near.map(d    => drinkCard(d.drink, { matchPct: d.pct, missing: d.missing })).join('')
                                    : `<p class="no-results-msg">No near matches found.</p>`;
  ptEl.innerHTML = partial.length  ? partial.map(d  => drinkCard(d.drink, { matchPct: d.pct })).join('') : '';

  document.getElementById('rsPerfect').style.display  = perfect.length ? '' : '';
  document.getElementById('rsNear').style.display      = near.length ? '' : '';
  document.getElementById('rsPartial').style.display   = partial.length ? '' : 'none';

  if (!perfect.length && !near.length && !partial.length) {
    document.getElementById('aiResults').classList.add('hidden');
    toast('No matches found. Try different ingredients!', 'info');
  }
}

function fuzzyMatch(a, b) {
  a = a.toLowerCase().trim(); b = b.toLowerCase().trim();
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  // Handle common synonyms
  const synonyms = { 'lime juice': ['lime'], 'lemon juice': ['lemon'], 'simple syrup': ['sugar syrup', 'syrup'], 'soda water': ['club soda', 'carbonated water'], 'whiskey': ['whisky', 'bourbon'] };
  for (const [key, vals] of Object.entries(synonyms)) {
    if ((a === key || vals.includes(a)) && (b === key || vals.includes(b))) return true;
  }
  return false;
}

// ── DRINK MODAL ────────────────────────────────────
async function openModal(drinkId) {
  const overlay = document.getElementById('drinkModal');
  const body = document.getElementById('drinkModalBody');
  overlay.classList.remove('hidden');
  body.innerHTML = `<div style="display:grid;place-items:center;height:300px"><div class="loading-dots"><span></span><span></span><span></span></div></div>`;

  const drink = await lookupById(drinkId);
  if (!drink) { body.innerHTML = '<p style="padding:24px;color:var(--text-muted)">Could not load drink details.</p>'; return; }

  const ings = getDrinkIngredients(drink);
  const isFav = state.favorites.some(f => f.idDrink === drink.idDrink);
  const isAlc = drink.strAlcoholic === 'Alcoholic';

  body.innerHTML = `
    <div class="modal-drink-content">
      <div class="modal-drink-img">
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" loading="lazy">
        <div class="modal-drink-img-overlay"></div>
      </div>
      <div class="modal-drink-body">
        <div class="modal-tags">
          ${drink.strAlcoholic ? `<span class="modal-tag ${isAlc ? 'alc' : 'nonalc'}">${drink.strAlcoholic}</span>` : ''}
          ${drink.strCategory ? `<span class="modal-tag">${drink.strCategory}</span>` : ''}
          ${drink.strGlass ? `<span class="modal-tag">${drink.strGlass}</span>` : ''}
        </div>
        <h2 class="modal-drink-title">${drink.strDrink}</h2>

        <div class="modal-section">
          <h4>Ingredients</h4>
          <ul class="ing-list">
            ${ings.map(i => `<li class="ing-item"><span class="ing-measure">${i.measure || '—'}</span><span class="ing-name">${i.name}</span></li>`).join('')}
          </ul>
        </div>

        <div class="modal-section">
          <h4>Instructions</h4>
          <p class="instructions">${drink.strInstructions || 'No instructions available.'}</p>
        </div>

        <div class="modal-actions">
          <button class="btn-primary modal-fav-btn" data-drink-id="${drink.idDrink}">
            <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${isFav ? 'Saved' : 'Save to Favorites'}
          </button>
          <button class="btn-secondary modal-addbar-btn">+ Add Ingredients to Bar</button>
        </div>
      </div>
    </div>`;

  // Fav in modal
  body.querySelector('.modal-fav-btn').addEventListener('click', function () {
    toggleFav({ idDrink: drink.idDrink, strDrink: drink.strDrink, strDrinkThumb: drink.strDrinkThumb, strCategory: drink.strCategory, strAlcoholic: drink.strAlcoholic, strGlass: drink.strGlass });
    const fav = state.favorites.some(f => f.idDrink === drink.idDrink);
    this.querySelector('svg').setAttribute('fill', fav ? 'currentColor' : 'none');
    this.lastChild.textContent = fav ? ' Saved' : ' Save to Favorites';
  });

  // Add to bar
  body.querySelector('.modal-addbar-btn').addEventListener('click', () => {
    const names = ings.map(i => i.name.toLowerCase());
    const fresh = names.filter(n => !state.inventory.includes(n));
    state.inventory.push(...fresh);
    save();
    toast(`Added ${fresh.length} new ingredient${fresh.length !== 1 ? 's' : ''} to your bar!`, 'success');
  });
}

document.getElementById('closeDrinkModal').addEventListener('click', () => document.getElementById('drinkModal').classList.add('hidden'));
document.getElementById('drinkModal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden'); });

// ── COMMUNITY ─────────────────────────────────────
function renderCommunity() {
  const all = [...SAMPLE_COMMUNITY, ...state.myRecipes.map(r => ({ ...r, isMine: true }))];
  const tab = state.communityTab;
  const shown = tab === 'mine' ? state.myRecipes : all;

  const grid = document.getElementById('communityGrid');
  const empty = document.getElementById('communityEmpty');

  if (!shown.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = shown.map(r => `
    <div class="recipe-card" data-comm-recipe="${r.id}">
      <div class="recipe-card-head">
        <h3>${r.name}</h3>
        ${r.isMine ? `<button class="btn-ghost" style="font-size:.75rem;padding:4px 8px" data-delete="${r.id}">Delete</button>` : ''}
      </div>
      <div class="recipe-card-meta">
        <span class="rbadge diff-${(r.difficulty||'Easy').toLowerCase()}">${r.difficulty || 'Easy'}</span>
        <span class="rbadge">${r.glass || 'Glass'}</span>
        ${r.alcoholic ? '<span class="rbadge">Alcoholic</span>' : '<span class="rbadge" style="color:var(--green)">Non-Alc</span>'}
      </div>
      <div class="recipe-card-body">
        <strong style="font-size:.8rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:6px">Ingredients</strong>
        <p>${(r.ingredients||'').split('\n').slice(0,3).join(' · ')}${(r.ingredients||'').split('\n').length > 3 ? ' …' : ''}</p>
      </div>
      ${r.garnish ? `<p style="font-size:.78rem;color:var(--text-dim);margin-top:8px">Garnish: ${r.garnish}</p>` : ''}
      <div class="recipe-card-footer">
        <span class="recipe-author">by ${r.author || 'You'}</span>
        <button class="recipe-like-btn ${(r.likedByMe) ? 'liked' : ''}" data-like="${r.id}">
          <svg viewBox="0 0 24 24" fill="${r.likedByMe ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${r.likes || 0}
        </button>
      </div>
    </div>`).join('');
}

document.getElementById('communityGrid').addEventListener('click', e => {
  const del = e.target.closest('[data-delete]');
  if (del) {
    const id = del.dataset.delete;
    if (confirm('Delete this recipe?')) {
      state.myRecipes = state.myRecipes.filter(r => r.id !== id);
      save(); renderCommunity(); toast('Recipe deleted', 'info');
    }
    return;
  }
  const like = e.target.closest('[data-like]');
  if (like) {
    const id = like.dataset.like;
    const sample = SAMPLE_COMMUNITY.find(r => r.id === id);
    if (sample) { sample.likedByMe = !sample.likedByMe; sample.likes += sample.likedByMe ? 1 : -1; }
    renderCommunity();
    return;
  }
  // Open recipe visualization
  const card = e.target.closest('[data-comm-recipe]');
  if (card && !e.target.closest('button')) {
    const id = card.dataset.commRecipe;
    const recipe = [...SAMPLE_COMMUNITY, ...state.myRecipes].find(r => r.id === id);
    if (recipe) openCommRecipeModal(recipe);
  }
});

function openCommRecipeModal(recipe) {
  document.getElementById('crmName').textContent = recipe.name;
  document.getElementById('crmMeta').innerHTML = `
    <span class="modal-tag">${recipe.difficulty||'Easy'}</span>
    <span class="modal-tag">${recipe.glass||'Glass'}</span>
    <span class="modal-tag">${recipe.alcoholic ? 'Alcoholic' : 'Non-Alc'}</span>
  `;
  document.getElementById('crmIngredients').innerHTML = `<ul class="ing-list">${
    (recipe.ingredients||'').split('\n').filter(Boolean)
      .map(i => `<li class="ing-item"><span class="ing-name">${i}</span></li>`).join('')
  }</ul>`;
  document.getElementById('crmInstructions').textContent = recipe.instructions||'';
  const ge = document.getElementById('crmGarnish');
  ge.textContent = recipe.garnish ? `Garnish: ${recipe.garnish}` : '';
  document.getElementById('crmAuthor').textContent = `By ${recipe.author||'Anonymous'}`;

  // Favorites button
  const favObj = { idDrink: recipe.id, strDrink: recipe.name, strDrinkThumb: '', strCategory: recipe.flavor||'Community', strAlcoholic: recipe.alcoholic ? 'Alcoholic' : 'Non alcoholic', strGlass: recipe.glass||'' };
  const favBtn = document.getElementById('crmFavBtn');
  const updateFavBtn = () => {
    const saved = state.favorites.some(f => f.idDrink === recipe.id);
    favBtn.querySelector('svg').setAttribute('fill', saved ? 'currentColor' : 'none');
    favBtn.lastChild.textContent = saved ? ' Saved' : ' Save to Favorites';
  };
  updateFavBtn();
  favBtn.onclick = () => { toggleFav(favObj); updateFavBtn(); };

  document.getElementById('commGlassLegend').innerHTML = '<p class="viz-hint">Pouring…</p>';
  document.getElementById('commRecipeModal').classList.remove('hidden');
  const gt = normalizeGlassName(recipe.glass||'');
  animateGlassViz(parseIngsText(recipe.ingredients||''), gt, 'commGlassSvg', 'commGlassInner', 'commPourStream', 'commGlassLegend');
}

document.querySelectorAll('.ctab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.ctab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    state.communityTab = t.dataset.ctab;
    renderCommunity();
  });
});

// Create recipe modal
// ── CREATE RECIPE INGREDIENT PICKER ───────────────
function renderRcIngPicker() {
  const picker = document.getElementById('rcIngPicker');
  if (!picker) return;
  const taVal = (document.getElementById('rcIngredients').value || '').toLowerCase();
  picker.innerHTML = AI_ING_CATS.map(cat => `
    <div class="rc-cat-mini">
      <span class="rc-cat-mini-label">${cat.name}</span>
      <div class="rc-cat-mini-tiles">
        ${cat.items.map(item => {
          const key = item.toLowerCase();
          const col = getIngColor(key);
          const sel = taVal.includes(key);
          return `<button type="button" class="rc-tile${sel ? ' selected' : ''}" data-item="${item}">
            <img class="rc-tile-img" src="https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(item)}-Small.png" alt="${item}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <span class="rc-tile-dot" style="background:${col};display:none"></span>
            <span class="rc-tile-name">${item}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`).join('');
}

function syncRcTiles() {
  const taVal = (document.getElementById('rcIngredients').value || '').toLowerCase();
  document.querySelectorAll('.rc-tile').forEach(t => {
    t.classList.toggle('selected', taVal.includes(t.dataset.item.toLowerCase()));
  });
}

document.getElementById('rcIngPicker').addEventListener('click', e => {
  const tile = e.target.closest('.rc-tile');
  if (!tile) return;
  const item = tile.dataset.item;
  const ta = document.getElementById('rcIngredients');
  const lines = ta.value.split('\n').map(l => l.trim()).filter(Boolean);
  const idx = lines.findIndex(l => l.toLowerCase().includes(item.toLowerCase()));
  if (idx === -1) {
    lines.push(`1 oz ${item}`);
    tile.classList.add('selected');
  } else {
    lines.splice(idx, 1);
    tile.classList.remove('selected');
  }
  ta.value = lines.join('\n');
  ta.dispatchEvent(new Event('input'));
});

document.getElementById('rcIngredients').addEventListener('input', () => syncRcTiles());

document.getElementById('rcCustomIngAdd').addEventListener('click', () => {
  const name = document.getElementById('rcCustomIngName').value.trim();
  if (!name) return;
  const measure = document.getElementById('rcCustomIngMeasure').value.trim();
  const ta = document.getElementById('rcIngredients');
  const line = measure ? `${measure} ${name}` : name;
  ta.value = ta.value ? ta.value + '\n' + line : line;
  ta.dispatchEvent(new Event('input'));
  document.getElementById('rcCustomIngName').value = '';
  document.getElementById('rcCustomIngMeasure').value = '';
  syncRcTiles();
});

['openCreateBtn', 'emptyCreateBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => {
    document.getElementById('createModal').classList.remove('hidden');
    renderRcIngPicker();
    renderGlassViz(parseIngsText(document.getElementById('rcIngredients').value), 'Highball');
  });
});
document.getElementById('closeCreateModal').addEventListener('click', () => document.getElementById('createModal').classList.add('hidden'));
document.getElementById('createModal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden'); });

// Glass type picker — syncs with hidden #rcGlass input
document.getElementById('glassTypePicker').addEventListener('click', e => {
  const btn = e.target.closest('.gpick');
  if (!btn) return;
  document.querySelectorAll('.gpick').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('rcGlass').value = btn.dataset.glass;
  renderGlassViz(parseIngsText(document.getElementById('rcIngredients').value), btn.dataset.glass);
});

// Live ingredient → glass viz
document.getElementById('rcIngredients').addEventListener('input', () => {
  const gt = document.querySelector('.gpick.active')?.dataset.glass || 'Highball';
  renderGlassViz(parseIngsText(document.getElementById('rcIngredients').value), gt);
});

// Community recipe view modal
document.getElementById('closeCommRecipeModal').addEventListener('click', () => {
  document.getElementById('commRecipeModal').classList.add('hidden');
  _glassAnims.forEach(clearTimeout); _glassAnims = [];
});
document.getElementById('commRecipeModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.add('hidden');
    _glassAnims.forEach(clearTimeout); _glassAnims = [];
  }
});

document.getElementById('createForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('rcName').value.trim();
  if (!name) return;
  const recipe = {
    id: 'u' + Date.now(),
    name,
    glass: document.getElementById('rcGlass').value,
    difficulty: document.getElementById('rcDifficulty').value,
    ingredients: document.getElementById('rcIngredients').value,
    instructions: document.getElementById('rcInstructions').value,
    garnish: document.getElementById('rcGarnish').value,
    flavor: document.getElementById('rcFlavor').value,
    alcoholic: document.getElementById('rcAlcoholic').checked,
    author: state.user?.name || 'You',
    likes: 0,
    isMine: true,
  };
  state.myRecipes.unshift(recipe);
  save();
  document.getElementById('createModal').classList.add('hidden');
  document.getElementById('createForm').reset();
  document.querySelectorAll('.gpick').forEach(b => b.classList.remove('active'));
  const hb = document.querySelector('[data-glass="Highball"]'); if (hb) hb.classList.add('active');
  renderGlassViz([], 'Highball');
  toast(`${name} saved to community!`, 'success');
  if (state.currentPage === 'community') renderCommunity();
  if (state.currentPage === 'profile') renderProfile();
});

// ── MY BAR ────────────────────────────────────────
function renderMyBar() {
  renderFavorites();
  renderInventory();
}

function renderFavorites() {
  const grid = document.getElementById('favGrid');
  const empty = document.getElementById('favEmpty');
  if (!state.favorites.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  grid.innerHTML = state.favorites.map(d => drinkCard(d)).join('');
}

function renderInventory() {
  const sections = document.getElementById('inventorySections');
  const filter = document.getElementById('inventorySearch').value.toLowerCase();

  sections.innerHTML = Object.entries(INVENTORY_CATEGORIES).map(([cat, items]) => {
    const filtered = filter ? items.filter(i => i.toLowerCase().includes(filter)) : items;
    if (!filtered.length) return '';
    return `
      <div class="inv-section">
        <div class="inv-section-title">${cat}</div>
        <div class="inv-grid">
          ${filtered.map(item => {
            const key = item.toLowerCase();
            const checked = state.inventory.includes(key);
            return `
              <div class="inv-item ${checked ? 'checked' : ''}" data-inv="${key}">
                <div class="inv-check"></div>
                <span class="inv-name">${item}</span>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

document.getElementById('inventorySections').addEventListener('click', e => {
  const item = e.target.closest('[data-inv]');
  if (!item) return;
  const key = item.dataset.inv;
  const idx = state.inventory.indexOf(key);
  if (idx === -1) state.inventory.push(key);
  else state.inventory.splice(idx, 1);
  save();
  item.classList.toggle('checked');
  const check = item.querySelector('.inv-check');
  // Visual updates handled by class
});

document.getElementById('inventorySearch').addEventListener('input', () => renderInventory());

document.querySelectorAll('.btab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.btab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    state.barTab = t.dataset.btab;
    document.getElementById('tabFavorites').classList.toggle('hidden', state.barTab !== 'favorites');
    document.getElementById('tabInventory').classList.toggle('hidden', state.barTab !== 'inventory');
  });
});

document.getElementById('barToAIBtn').addEventListener('click', () => {
  state.ingredients = [...state.inventory];
  renderChips();
  goTo('ai-bartender');
  requestAnimationFrame(() => runAI());
});

// ── PROFILE / AUTH ────────────────────────────────
function renderProfile() {
  const guest  = document.getElementById('profileGuest');
  const user   = document.getElementById('profileUser');
  if (state.user) {
    guest.classList.add('hidden');
    user.classList.remove('hidden');
    document.getElementById('profileAvatar').textContent = state.user.name?.[0]?.toUpperCase() || 'U';
    document.getElementById('profileName').textContent = state.user.name || 'User';
    document.getElementById('profileEmail').textContent = state.user.email || '';
    document.getElementById('psFav').textContent = state.favorites.length;
    document.getElementById('psRec').textContent = state.myRecipes.length;
    document.getElementById('psIng').textContent = state.inventory.length;
    const fg = document.getElementById('profileFavGrid');
    fg.innerHTML = state.favorites.slice(0, 4).map(d => drinkCard(d)).join('');
  } else {
    guest.classList.remove('hidden');
    user.classList.add('hidden');
  }
}

document.querySelectorAll('.atab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.atab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const tab = t.dataset.atab;
    document.getElementById('signinForm').classList.toggle('hidden', tab !== 'signin');
    document.getElementById('signupForm').classList.toggle('hidden', tab !== 'signup');
  });
});

document.getElementById('signinForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('siEmail').value;
  const name = email.split('@')[0].replace(/\./g, ' ');
  state.user = { name: capitalize(name), email };
  save(); renderProfile();
  toast(`Welcome back, ${state.user.name}!`, 'success');
});

document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('suName').value;
  const email = document.getElementById('suEmail').value;
  state.user = { name, email };
  save(); renderProfile();
  toast(`Account created! Welcome, ${name}!`, 'success');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  state.user = null;
  save(); renderProfile();
  toast('Signed out', 'info');
});

// ── GLOBAL EVENT DELEGATION ───────────────────────
document.addEventListener('click', e => {
  // Navigation via data-nav
  const navEl = e.target.closest('[data-nav]');
  if (navEl && !navEl.closest('.modal-overlay')) {
    goTo(navEl.dataset.nav);
    return;
  }

  // Open drink modal
  const openEl = e.target.closest('[data-open]');
  if (openEl && openEl.dataset.open && !openEl.closest('.modal-overlay')) {
    openDrink(openEl.dataset.open);
    return;
  }

  // Fav toggle (prevent bubbling to card open)
  const favEl = e.target.closest('[data-fav]');
  if (favEl) {
    e.stopPropagation();
    const id = favEl.dataset.fav;
    // Build minimal drink object from card
    const card = favEl.closest('.drink-card');
    const img  = card?.querySelector('img');
    const name = card?.querySelector('.drink-name')?.textContent || '';
    const cat  = card?.querySelector('.drink-meta-tag')?.textContent || '';
    const alc  = card?.querySelector('.alc-badge')?.textContent?.includes('Alc') ? 'Alcoholic' : '';
    toggleFav({ idDrink: id, strDrink: name, strDrinkThumb: img?.src || '', strCategory: cat, strAlcoholic: alc, strGlass: '' });
    return;
  }

  // Click on drink card (anywhere except buttons)
  const cardEl = e.target.closest('.drink-card');
  if (cardEl && !e.target.closest('button') && cardEl.dataset.open) {
    openDrink(cardEl.dataset.open);
    return;
  }
});

// Keyboard: Enter on card
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const card = e.target.closest('.drink-card');
    if (card && card.dataset.open) openModal(card.dataset.open);
  }
});

// Mobile menu
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── UTILS ─────────────────────────────────────────
function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
function capitalize(str) { return str.replace(/\b\w/g, c => c.toUpperCase()); }

// ── INIT ──────────────────────────────────────────
load();

document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('ageGate').style.transition = 'opacity .4s ease';
  document.getElementById('ageGate').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('ageGate').style.display = 'none';
    document.getElementById('app').removeAttribute('hidden');
  }, 400);
  goTo('home');
});

// Immediately start loading home content in background
setTimeout(async () => {
  if (!_featured) { _featured = await getRandom(); }
  if (!_trending) {
    const results = await Promise.all(TRENDING.map(q => searchDrinks(q)));
    _trending = results.flatMap(r => r.slice(0, 1));
  }
  if (!_randoms) {
    const rs = await Promise.all(Array.from({ length: 4 }, getRandom));
    _randoms = rs.filter(Boolean);
  }
  // If already on home page, render
  if (state.currentPage === 'home') {
    renderFeatured(_featured);
    document.getElementById('trendingGrid').innerHTML = _trending.map(d => drinkCard(d)).join('');
    document.getElementById('randomGrid').innerHTML = _randoms.map(d => drinkCard(d)).join('');
  }
}, 100);
