"use client";
import React, { useState, useRef } from 'react';
import Link from "next/link";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PiSparkle, PiSprayBottle } from "react-icons/pi";
import { FiFeather, FiSun } from "react-icons/fi";
import { Search, Tag, Clock, User, ArrowRight, Wind, Sparkles, Droplet } from 'lucide-react';

// Helper function to convert markdown-style text to HTML
const formatBlogContent = (content: string) => {
  return content
    // Convert **bold** to <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert bullet points
    .replace(/^\*   /gm, '• ')
    // Convert numbered lists
    .replace(/^\d+\. /gm, (match) => `<span class="font-semibold text-blue-600">${match}</span>`)
    // Add spacing after colons for better readability
    .replace(/:/g, ':')
    // Convert line breaks to proper spacing
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
};

const blogPosts = [
  {
    id: 1,
    title: "Professional House Cleaning Secrets",
    excerpt: "Learn the tips and tricks the pros use to get your home sparkling clean in no time.",
    image: "/images/bolgs/professional.jpg",
    author: "Usman Ahmad",
    readTime: "7 min",
    category: "Tips & Tricks",
    content: `Ever wonder how professional cleaners get homes looking so pristine? It's not magic, but a combination of technique, the right tools, and a bit of elbow grease. Here are some secrets from the industry to help you clean like a pro.

<strong>1. Have a System:</strong> Pros don't wander aimlessly. They use a top-to-bottom, left-to-right approach in each room. This ensures that dust and debris fall downwards and are cleaned up as they go. Start with dusting ceiling fans and light fixtures, then move to furniture and surfaces, and finish with the floors.

<strong>2. The Power of Microfiber:</strong> Ditch the paper towels. Microfiber cloths are the MVP of cleaning. They grab and hold onto dust and dirt instead of pushing it around. They're also super absorbent and can be washed and reused hundreds of times.

<strong>3. Let Your Cleaners Work:</strong> Don't just spray and wipe immediately. For tougher grime, especially in kitchens and bathrooms, spray your cleaner and let it sit for a few minutes. This gives the chemicals time to break down the dirt, so you have to scrub less.

<strong>4. Don't Forget the Details:</strong> Baseboards, light switches, and door frames are often overlooked but collect a lot of dust and fingerprints. A quick wipe-down can make a huge difference in the overall cleanliness of a room.

<strong>5. Vacuum Like a Pro:</strong> For carpets, slow and steady wins the race. Vacuum in overlapping rows, and then do a second pass at a 90-degree angle to the first. This helps to lift the carpet pile and remove more embedded dirt.`
  },
  {
    id: 2,
    title: "Eco-Friendly Cleaning: A Greener Home",
    excerpt: "Discover how to effectively clean your home using natural, non-toxic products.",
    image: "/images/bolgs/eco-friendly.jpeg",
    author: "Usman Ahmad",
    readTime: "6 min",
    category: "Eco-Friendly",
    content: `Going green with your cleaning routine is not only better for the environment but also for your family's health. Many commercial cleaners contain harsh chemicals that can cause respiratory issues and skin irritation. Here's how to switch to a greener cleaning routine.

<strong>1. White Vinegar is Your Best Friend:</strong> This pantry staple is a natural disinfectant and deodorizer. A solution of equal parts water and white vinegar can be used to clean windows, countertops (except natural stone), and floors.

<strong>2. Baking Soda for Scrubbing:</strong> Baking soda is a gentle abrasive, perfect for scrubbing sinks, tubs, and ovens without scratching. Make a paste with a little water to tackle tough grime.

<strong>3. Lemon Juice for Shine:</strong> Lemon juice is a natural bleach and degreaser. Use it to shine faucets, remove stains from cutting boards, and make your kitchen smell fresh.

<strong>4. Castile Soap for Everything Else:</strong> Unscented liquid castile soap is a versatile, vegetable-based soap that can be used to make an all-purpose cleaner. Mix a few teaspoons with water in a spray bottle, and add a few drops of your favorite essential oil for a pleasant scent.

<strong>5. Embrace Reusables:</strong> Ditch single-use wipes and paper towels. Opt for washable microfiber cloths, reusable spray bottles, and sponges made from natural materials.`
  },
  {
    id: 3,
    title: "Kitchen Deep Cleaning Mastery",
    excerpt: "A step-by-step guide to tackling the heart of your home, from greasy stovetops to cluttered cabinets.",
    image: "/images/bolgs/kitchen.jpeg",
    author: "Usman Ahmad",
    readTime: "9 min",
    category: "Deep Cleaning",
    content: `The kitchen is often the busiest room in the house, and it can get dirty fast. A deep clean can feel overwhelming, but breaking it down into manageable steps makes it easy.

<strong>1. Declutter and Wipe Cabinets:</strong> Start by emptying your cabinets. Wipe down the inside and outside of the cabinets with a warm, soapy water solution. This is a great time to get rid of any expired food or unused gadgets.

<strong>2. Tackle the Appliances:</strong>
• <strong>Oven:</strong> Use an oven cleaner or a paste of baking soda and water. Let it sit overnight for best results, then scrape and wipe clean.
• <strong>Microwave:</strong> Heat a bowl of water and lemon slices for a few minutes to loosen grime, then wipe the inside clean.
• <strong>Refrigerator:</strong> Remove all shelves and drawers and wash them in warm, soapy water. Wipe down the interior before putting everything back.
• <strong>Dishwasher:</strong> Run an empty cycle with a cup of white vinegar on the top rack to clean and deodorize.

<strong>3. Degrease the Stovetop and Backsplash:</strong> Use a degreasing cleaner to cut through built-up grease on your stovetop and backsplash. For tough spots, a paste of baking soda can be a powerful scrubber.

<strong>4. Clean the Sink:</strong> Scrub your sink with a gentle abrasive cleaner or baking soda. Don't forget to clean the garbage disposal by grinding up some ice cubes and lemon peels to sharpen the blades and freshen the drain.

<strong>5. Finish with Floors:</strong> Once everything else is clean, sweep or vacuum the floor thoroughly before mopping. Pay extra attention to the areas under cabinets and appliances.`
  },
  {
    id: 4,
    title: "The Ultimate Move-In/Move-Out Cleaning Checklist",
    excerpt: "Ensure you get your security deposit back or start fresh in your new home with this comprehensive list.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "10 min",
    category: "Checklists",
    content: `Whether you're moving in or moving out, a thorough cleaning is essential. For move-outs, it's key to getting your security deposit back. For move-ins, it's about starting with a clean slate.

<strong>General (All Rooms):</strong>
• Dust all surfaces, including ceiling fans, light fixtures, and blinds
• Wipe down walls, baseboards, door frames, and light switches
• Clean windows and window sills
• Vacuum all carpets and mop all hard floors
• Clean out closets, wiping down shelves

<strong>Kitchen:</strong>
• Clean inside and out of all cabinets and drawers
• Deep clean all appliances: oven, refrigerator, microwave, and dishwasher
• Scrub countertops, sink, and backsplash
• Clean the range hood

<strong>Bathrooms:</strong>
• Scrub and disinfect the toilet, inside and out
• Clean the shower, tub, and sink, removing any soap scum or mildew
• Wipe down mirrors and medicine cabinets
• Clean inside cabinets and drawers

<strong>Don't Forget:</strong>
• Clean any outdoor spaces like patios or balconies
• Remove all nails and patch any holes in the walls
• Dispose of all trash and recycling properly`
  },
  {
    id: 5,
    title: "Quick Daily Cleaning Habits for a Sparkling Home",
    excerpt: "Spend just 15-20 minutes a day on these simple tasks to maintain a consistently clean home.",
    image: "/images/bolgs/quick.jpg",
    author: "Usman Ahmad",
    readTime: "5 min",
    category: "Habits",
    content: `Keeping a home clean doesn't have to be a monumental weekend task. Incorporating a few small habits into your daily routine can make a huge difference.

<strong>1. Make Your Bed:</strong> It's a small task that instantly makes your bedroom look more put-together and sets a productive tone for the day.

<strong>2. Wipe Down Kitchen Counters:</strong> After every meal preparation, give your kitchen counters a quick wipe. This prevents food particles from becoming crusted on and attracting pests.

<strong>3. Squeegee Your Shower:</strong> After showering, take 30 seconds to squeegee the walls and glass door. This prevents soap scum buildup and water spots, making your deep cleans much easier.

<strong>4. The One-Minute Rule:</strong> If a task takes less than one minute to complete, do it immediately. This could be putting a dish in the dishwasher, wiping up a small spill, or putting away your shoes.

<strong>5. Tidy Up Before Bed:</strong> Spend 5-10 minutes every evening doing a quick "reset." Put things back where they belong, fluff the couch pillows, and load the dishwasher. You'll wake up to a much more pleasant environment.`
  },
  {
    id: 6,
    title: "Natural Stain Removal: Secrets from Grandma's Handbook",
    excerpt: "Tackle tough stains with simple, effective, and natural ingredients you probably already have at home.",
    image: "/images/bolgs/stain.jpg",
    author: "Usman Ahmad",
    readTime: "8 min",
    category: "DIY",
    content: `Before reaching for a chemical-laden stain remover, check your pantry. Many common household items are incredibly effective at removing stains.

<strong>1. Coffee or Tea:</strong> Blot the stain immediately. Mix a solution of one part white vinegar to two parts water and dab it on the stain.

<strong>2. Red Wine:</strong> The classic nemesis. Blot, then cover the stain with salt to absorb the wine. After a few minutes, rinse with cool water. For stubborn stains, a paste of baking soda and water can work wonders.

<strong>3. Grease and Oil:</strong> Cover the stain with cornstarch or baking soda. Let it sit for 30 minutes to absorb the oil, then brush it off and launder as usual.

<strong>4. Ink:</strong> Apply a small amount of milk or hand sanitizer (rubbing alcohol) to the stain. Blot gently until the ink is lifted, then wash.

<strong>5. Blood:</strong> Always use cold water for blood stains, as hot water will set the stain. Dab with hydrogen peroxide for fresh stains, or soak in salt water for dried stains.`
  },
  {
    id: 7,
    title: "Professional Cleaning Services in Toronto: Your Complete Guide",
    excerpt: "Everything you need to know about hiring professional cleaning services in Toronto, from what to expect to how to choose the right company.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "12 min",
    category: "Local Services",
    content: `Toronto's busy lifestyle makes professional cleaning services more essential than ever. Whether you're a busy professional, a growing family, or managing multiple properties, understanding the local cleaning service landscape can help you make the best choice.

<strong>Why Choose Professional Cleaning in Toronto?</strong>

Living in Canada's largest city comes with unique challenges. From condo living to large family homes, Toronto residents face:
• High pollen counts during spring and summer
• Winter salt and slush tracked indoors
• Urban dust and pollution
• Limited time due to long commutes

<strong>Types of Cleaning Services Available:</strong>

<strong>1. Residential Cleaning:</strong> Perfect for busy professionals and families. Most companies offer weekly, bi-weekly, or monthly services.

<strong>2. Condo Cleaning:</strong> Specialized services for Toronto's many high-rise condominiums, understanding the unique access and space constraints.

<strong>3. Deep Cleaning:</strong> Seasonal deep cleans are especially popular before winter and after the spring thaw.

<strong>4. Move-In/Move-Out Cleaning:</strong> Essential in Toronto's active rental market, helping ensure security deposits are returned.

<strong>5. Post-Construction Cleaning:</strong> With Toronto's ongoing development boom, construction cleanup is in high demand.

<strong>What to Expect from Toronto Cleaning Services:</strong>

• Bonded and insured staff
• Eco-friendly cleaning products (increasingly standard)
• Flexible scheduling to accommodate busy lifestyles
• Bilingual services (English/French)
• Competitive pricing due to market competition

<strong>Average Service Areas Covered:</strong>
Most Toronto cleaning services cover the GTA including North York, Scarborough, Etobicoke, York, East York, and surrounding areas like Mississauga, Brampton, and Markham.`
  },
  {
    id: 8,
    title: "Cleaning Service Prices in Toronto: 2024 Complete Pricing Guide",
    excerpt: "Transparent pricing breakdown for all types of cleaning services in Toronto. Know what to expect before you book.",
    image: "https://images.unsplash.com/photo-1554774853-6a56f62c6451?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "10 min",
    category: "Pricing",
    content: `Understanding cleaning service costs in Toronto helps you budget effectively and choose the right service for your needs. Here's a comprehensive breakdown of current market rates.

<strong>Regular House Cleaning Prices:</strong>

<strong>Studio/1 Bedroom:</strong> $80-120 per visit
<strong>2 Bedroom:</strong> $100-150 per visit  
<strong>3 Bedroom:</strong> $120-180 per visit
<strong>4+ Bedroom:</strong> $150-250+ per visit

<strong>Factors Affecting Price:</strong>

• <strong>Frequency:</strong> Weekly services typically cost 10-20% less than one-time cleanings
• <strong>Location:</strong> Downtown Toronto may have higher rates than suburban areas
• <strong>Home condition:</strong> Initial deep clean costs 50-100% more than regular maintenance
• <strong>Special requests:</strong> Inside oven, fridge, or window cleaning adds $20-50

<strong>Deep Cleaning Services:</strong>

<strong>One-Time Deep Clean:</strong> $200-400 depending on home size
<strong>Spring Cleaning:</strong> $250-500 for comprehensive service
<strong>Post-Construction:</strong> $300-600 depending on mess level

<strong>Specialized Services:</strong>

<strong>Move-In/Move-Out:</strong> $200-400
<strong>Airbnb Turnover:</strong> $60-120 per clean
<strong>Office Cleaning:</strong> $0.10-0.20 per square foot
<strong>Carpet Cleaning:</strong> $25-50 per room

<strong>Money-Saving Tips:</strong>

• Book recurring services for better rates
• Bundle multiple services
• Book during off-peak times
• Maintain your home between professional cleanings
• Compare quotes from multiple companies

<strong>What's Included in Standard Pricing:</strong>
• All basic cleaning supplies and equipment
• Dusting, vacuuming, and mopping
• Bathroom and kitchen cleaning
• Trash removal
• Basic organization`
  },
  {
    id: 9,
    title: "Best Airbnb Cleaning Services: Keep Your Guests Happy",
    excerpt: "Specialized cleaning tips and services for Airbnb hosts to ensure 5-star reviews and repeat bookings.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "8 min",
    category: "Airbnb",
    content: `Running a successful Airbnb requires impeccable cleanliness standards. Guest expectations are high, and your cleaning routine can make or break your reviews and bookings.

<strong>Why Airbnb Cleaning is Different:</strong>

Unlike regular home cleaning, Airbnb cleaning must be:
• Completed quickly between guests (often same-day turnovers)
• Thorough enough to earn 5-star cleanliness ratings
• Consistent across all stays
• Photo-ready for your next guests

<strong>Essential Airbnb Cleaning Checklist:</strong>

<strong>Before Guest Arrival:</strong>
• Strip and wash all bedding in hot water
• Sanitize all high-touch surfaces
• Deep clean bathrooms with hospital-grade disinfectants
• Vacuum and mop all floors
• Clean inside and outside of appliances
• Restock toiletries and essentials

<strong>Between-Stay Deep Clean:</strong>
• Check for damage or wear
• Deep clean carpets and upholstery
• Wash windows and mirrors
• Organize closets and storage areas
• Check and replace air fresheners

<strong>Professional vs. DIY Cleaning:</strong>

<strong>DIY Pros:</strong>
• Lower cost per cleaning
• Complete control over standards
• Immediate availability

<strong>Professional Pros:</strong>
• Consistent quality
• Time savings for hosts
• Professional-grade equipment
• Backup coverage when needed
• Often faster turnaround times

<strong>Choosing an Airbnb Cleaning Service:</strong>

• Experience with short-term rentals
• Same-day turnaround capability
• Flexible scheduling
• Quality guarantees
• Competitive pricing for frequent cleanings

<strong>Cost Considerations:</strong>
Professional Airbnb cleaning typically costs $60-120 per turnaround, depending on property size and location. While this may seem expensive, factor in:
• Time savings (2-4 hours per clean)
• Consistent quality leading to better reviews
• Professional equipment and supplies included
• Reduced stress and flexibility for hosts`
  },
  {
    id: 10,
    title: "Office Cleaning Services: Creating a Healthier Workplace",
    excerpt: "How professional office cleaning services boost productivity, employee health, and create a positive work environment.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "9 min",
    category: "Commercial",
    content: `A clean office isn't just about appearances—it's about productivity, health, and employee satisfaction. Professional office cleaning services provide benefits that extend far beyond surface cleanliness.

<strong>The Business Case for Professional Office Cleaning:</strong>

<strong>1. Reduced Sick Days:</strong> Professional cleaning reduces bacteria and viruses by up to 99%, leading to fewer employee sick days.

<strong>2. Increased Productivity:</strong> Clean, organized workspaces help employees focus and feel more motivated.

<strong>3. Professional Image:</strong> A spotless office impresses clients and reinforces your company's attention to detail.

<strong>4. Equipment Longevity:</strong> Regular cleaning extends the life of office furniture, carpets, and electronics.

<strong>Standard Office Cleaning Services Include:</strong>

<strong>Daily Tasks:</strong>
• Emptying trash and recycling bins
• Cleaning and sanitizing restrooms
• Wiping down desks and common surfaces
• Vacuuming high-traffic areas
• Kitchen/break room cleaning

<strong>Weekly Tasks:</strong>
• Thorough vacuuming of all carpeted areas
• Mopping hard floors
• Cleaning glass doors and windows
• Dusting all surfaces including electronics
• Deep cleaning restrooms

<strong>Monthly Deep Cleaning:</strong>
• Carpet deep cleaning or steam cleaning
• Light fixture cleaning
• Baseboards and window sills
• Behind-furniture cleaning
• HVAC vent cleaning

<strong>Choosing the Right Office Cleaning Service:</strong>

• <strong>Bonded and Insured:</strong> Protect your business from liability
• <strong>Flexible Scheduling:</strong> After-hours or weekend cleaning options
• <strong>Green Cleaning Options:</strong> Eco-friendly products for employee health
• <strong>Specialized Equipment:</strong> Professional-grade vacuums and sanitizers
• <strong>Quality Guarantees:</strong> Commitment to consistent service

<strong>Office Cleaning Pricing:</strong>
Commercial cleaning typically ranges from $0.10-$0.20 per square foot, depending on:
• Frequency of service
• Level of cleaning required
• Office layout and complexity
• Special requirements (medical offices, food service areas)

<strong>Creating a Healthier Workplace:</strong>
Professional cleaning services focus on high-touch areas like door handles, keyboards, phones, and shared equipment—areas where germs spread most quickly in office environments.`
  },
  {
    id: 11,
    title: "Seasonal Cleaning Guide: Preparing Your Home Year-Round",
    excerpt: "Complete seasonal cleaning checklist to keep your home fresh and organized throughout the year's changing demands.",
    image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "11 min",
    category: "Seasonal",
    content: `Each season brings unique cleaning challenges and opportunities. A strategic seasonal approach helps maintain your home efficiently while addressing weather-specific needs.

<strong>Spring Cleaning (March-May):</strong>

<strong>The Deep Reset:</strong>
• Open windows for fresh air circulation
• Deep clean carpets and upholstery
• Organize closets and donate winter items
• Clean light fixtures and ceiling fans
• Wash windows inside and out

<strong>Outdoor Preparation:</strong>
• Power wash decks and patios
• Clean outdoor furniture
• Organize garage and storage areas
• Service lawn equipment
• Plant and garden preparation

<strong>Summer Cleaning (June-August):</strong>

<strong>Focus on High-Use Areas:</strong>
• Deep clean air conditioning units and change filters
• Organize and clean outdoor entertaining spaces
• Focus on kitchen deep cleaning (more cooking and entertaining)
• Maintain pool areas if applicable
• Regular pest control measures

<strong>Fall Cleaning (September-November):</strong>

<strong>Winter Preparation:</strong>
• Clean and store summer items
• Deep clean heating systems and change filters
• Weatherproof windows and doors
• Organize and declutter before holiday season
• Deep clean guest rooms for holiday visitors

<strong>Gutter Cleaning and Maintenance:</strong>
• Clear leaves and debris
• Check for damage or leaks
• Ensure proper drainage

<strong>Winter Cleaning (December-February):</strong>

<strong>Indoor Focus:</strong>
• Deep clean and organize indoor spaces
• Focus on humidity control and air quality
• Regular cleaning of entryways (salt and slush tracking)
• Deep clean and organize closets
• Plan for spring cleaning

<strong>Holiday Preparation and Recovery:</strong>
• Pre-holiday deep clean
• Post-holiday organization and decoration storage
• Deep clean after entertaining

<strong>Monthly Seasonal Tasks:</strong>

<strong>Year-Round Monthly Tasks:</strong>
• Change HVAC filters
• Deep clean one room thoroughly
• Organize one major area (closet, garage, basement)
• Check and clean major appliances
• Review and update emergency supplies

<strong>Professional Seasonal Services:</strong>
Many homeowners hire professionals for:
• Spring deep cleaning
• Fall preparation cleaning
• Post-holiday cleanup
• Carpet and upholstery cleaning
• Window cleaning (exterior)`
  },
  {
    id: 12,
    title: "Cleaning Service Insurance and What It Means for You",
    excerpt: "Understanding the importance of insurance when hiring cleaning services and how it protects both you and your property.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "7 min",
    category: "Insurance",
    content: `When hiring a cleaning service, insurance isn't just a nice-to-have—it's essential protection for your home, belongings, and peace of mind.

<strong>Types of Insurance Cleaning Services Should Have:</strong>

<strong>1. General Liability Insurance:</strong>
• Covers damage to your property during cleaning
• Protects against accidents (broken items, water damage)
• Typically ranges from $1-2 million coverage
• Essential for any professional service

<strong>2. Bonding (Employee Dishonesty Insurance):</strong>
• Protects against theft by cleaning staff
• Covers missing or stolen items
• Shows the company has vetted their employees
• Provides financial compensation if theft occurs

<strong>3. Workers' Compensation:</strong>
• Covers injuries to cleaning staff in your home
• Protects you from liability if a worker is hurt
• Required by law in most areas
• Prevents homeowner liability for workplace injuries

<strong>What to Ask Before Hiring:</strong>

<strong>Essential Questions:</strong>
• "Can you provide proof of current insurance certificates?"
• "What is your liability coverage amount?"
• "Are your employees bonded?"
• "Do you carry workers' compensation insurance?"
• "What happens if something is damaged or goes missing?"

<strong>Red Flags to Avoid:</strong>
• Companies that can't provide insurance documentation
• Unusually low prices (may indicate corner-cutting on insurance)
• Cash-only operations
• Reluctance to discuss insurance coverage
• No written contracts or service agreements

<strong>What Insurance Typically Covers:</strong>

<strong>Property Damage:</strong>
• Broken furniture or decorative items
• Water damage from cleaning equipment
• Damage to floors, walls, or fixtures
• Electrical damage from equipment

<strong>Theft Protection:</strong>
• Missing jewelry or valuables
• Cash or small electronics
• Personal documents or items
• Identity theft protection (in some cases)

<strong>What's Usually NOT Covered:</strong>
• Pre-existing damage to items
• Normal wear and tear
• Damage due to homeowner negligence
• Items left in insecure locations

<strong>Filing a Claim:</strong>

If damage or theft occurs:
• Document everything immediately with photos
• Contact the cleaning company within 24-48 hours
• File a detailed written report
• Keep all receipts and documentation
• Follow up regularly on claim progress

<strong>Your Homeowner's Insurance:</strong>
While the cleaning service's insurance is primary, your homeowner's or renter's insurance may provide additional coverage. Check with your agent about coverage limits and requirements for service providers in your home.`
  },
  {
    id: 13,
    title: "Vancouver Cleaning Services: Coastal Living Cleaning Solutions",
    excerpt: "Specialized cleaning services for Vancouver's unique coastal environment, from high-rise condos to heritage homes.",
    image: "https://images.unsplash.com/photo-1582582494312-34ad07c1c8e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "10 min",
    category: "Local Services",
    content: `Vancouver's coastal location creates unique cleaning challenges that require specialized knowledge and approach. From dealing with salt air to managing the effects of constant rain, professional cleaning services in Vancouver understand these local conditions.

<strong>Vancouver's Unique Cleaning Challenges:</strong>

<strong>1. Salt Air and Moisture:</strong>
• Windows need frequent cleaning due to salt residue
• Metal fixtures require special care to prevent corrosion
• Higher humidity levels promote mold and mildew growth
• Regular deep cleaning is essential for coastal properties

<strong>2. Rainy Season Considerations:</strong>
• Mud and moisture tracking from October to April
• Increased need for entry mat services
• Regular floor cleaning and protection
• Humidity control and air quality management

<strong>Popular Vancouver Cleaning Services:</strong>

<strong>High-Rise Condo Cleaning:</strong>
Vancouver's skyline is filled with condominiums requiring specialized cleaning:
• Understanding building access protocols
• Working with concierge and building management
• Compact space optimization
• Balcony cleaning with safety considerations

<strong>Heritage Home Restoration Cleaning:</strong>
• Delicate cleaning for older character homes
• Specialized care for original hardwood and fixtures
• Post-renovation cleanup services
• Preservation-focused cleaning methods

<strong>Vancouver Pricing Guide 2024:</strong>

<strong>Downtown/West End:</strong> Premium rates due to access challenges
<strong>Studio:</strong> $90-130 per visit
<strong>1 Bedroom:</strong> $110-160 per visit
<strong>2 Bedroom:</strong> $130-190 per visit
<strong>3+ Bedroom:</strong> $160-280 per visit

<strong>Richmond/Burnaby/Surrey:</strong> Standard rates
<strong>Studio:</strong> $80-120 per visit
<strong>1 Bedroom:</strong> $100-150 per visit
<strong>2 Bedroom:</strong> $120-170 per visit
<strong>3+ Bedroom:</strong> $150-250 per visit

<strong>Seasonal Services Popular in Vancouver:</strong>
• Spring deep cleaning after rainy season
• Summer deck and patio cleaning
• Fall leaf cleanup and gutter clearing
• Winter moisture control and indoor air quality

<strong>Eco-Friendly Focus:</strong>
Vancouver residents increasingly prefer green cleaning services:
• Plant-based cleaning products
• Minimal environmental impact
• Sustainable cleaning practices
• Ocean-safe product choices`
  },
  {
    id: 14,
    title: "Calgary Cleaning Services: Prairie City Home Care",
    excerpt: "Professional cleaning services tailored for Calgary's climate, from Chinook winds to harsh winters.",
    image: "https://images.unsplash.com/photo-1558618666-fbd451c5cd64?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "9 min",
    category: "Local Services",
    content: `Calgary's unique prairie climate and rapid growth create specific cleaning needs. From dealing with Chinook winds to managing winter's harsh conditions, professional cleaning services in Calgary are equipped to handle it all.

<strong>Calgary's Climate Cleaning Challenges:</strong>

<strong>1. Chinook Winds:</strong>
• Sudden dust storms require immediate cleaning response
• Windows and surfaces need frequent attention
• Air filtration systems require regular maintenance
• Outdoor furniture and patios need special care

<strong>2. Harsh Winter Conditions:</strong>
• Salt and sand tracking from November to March
• Ice melt chemicals require careful floor protection
• Dry winter air increases static and dust buildup
• Regular entrance mat and floor cleaning essential

<strong>Popular Calgary Neighborhoods We Serve:</strong>

<strong>Downtown Core:</strong> High-rise condos and corporate offices
<strong>Beltline:</strong> Modern condos and trendy apartments
<strong>Kensington:</strong> Character homes and heritage properties
<strong>Mission:</strong> Mixed residential and commercial
<strong>Hillhurst:</strong> Family homes and established neighborhoods

<strong>Calgary Cleaning Service Pricing:</strong>

<strong>Inner City (Beltline, Kensington, Mission):</strong>
<strong>1 Bedroom:</strong> $85-125 per visit
<strong>2 Bedroom:</strong> $110-160 per visit
<strong>3 Bedroom:</strong> $135-185 per visit
<strong>4+ Bedroom:</strong> $160-240 per visit

<strong>Suburbs (Harvest Hills, Cranston, Auburn Bay):</strong>
<strong>2 Bedroom:</strong> $100-150 per visit
<strong>3 Bedroom:</strong> $125-175 per visit
<strong>4 Bedroom:</strong> $150-210 per visit
<strong>Large Homes (5+ BR):</strong> $200-300+ per visit

<strong>Specialized Calgary Services:</strong>

<strong>Post-Construction Cleaning:</strong>
With Calgary's building boom, post-construction cleaning is in high demand:
• New home builder cleanup
• Renovation aftermath cleaning
• Commercial construction cleanup
• Move-in ready preparation

<strong>Corporate Office Cleaning:</strong>
Calgary's business district requires professional office cleaning:
• Energy sector offices
• Financial institutions
• Tech companies
• Co-working spaces

<strong>Seasonal Considerations:</strong>
• Spring cleaning after harsh winters
• Summer deck and outdoor space preparation
• Fall preparation for winter conditions
• Year-round entrance protection services`
  },
  {
    id: 15,
    title: "Montreal Cleaning Services: Bilingual Home Care Excellence",
    excerpt: "Professional cleaning services in Montreal offering bilingual service and understanding of local Quebec regulations.",
    image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "11 min",
    category: "Local Services",
    content: `Montreal's unique cultural landscape and provincial regulations create specific requirements for cleaning services. Professional cleaners in Montreal understand both the bilingual service expectations and Quebec's regulatory environment.

<strong>Montreal's Unique Service Requirements:</strong>

<strong>1. Bilingual Service Standards:</strong>
• French and English communication
• Understanding of Quebec consumer protection laws
• Culturally sensitive service approach
• Compliance with provincial regulations

<strong>2. Heritage Building Considerations:</strong>
• Old Montreal's historic properties
• Plateau's iconic spiral staircases
• Mile End's character buildings
• Specialized care for heritage features

<strong>Montreal Neighborhood Services:</strong>

<strong>Downtown/Ville-Marie:</strong>
• High-rise condominiums
• Corporate office buildings
• Luxury apartments
• Historic properties

<strong>Plateau-Mont-Royal:</strong>
• Walk-up apartments
• Heritage duplexes and triplexes
• Artist studios and lofts
• Outdoor staircases (seasonal cleaning)

<strong>Westmount/Outremont:</strong>
• Luxury single-family homes
• Large estates and mansions
• High-end condominiums
• Premium service expectations

<strong>Montreal Cleaning Pricing (CAD):</strong>

<strong>Central Montreal:</strong>
<strong>1-2 Rooms:</strong> $75-115 per visit
<strong>3-4 Rooms:</strong> $95-145 per visit
<strong>5-6 Rooms:</strong> $120-180 per visit
<strong>Large Homes:</strong> $150-250+ per visit

<strong>Specialized Montreal Services:</strong>

<strong>Post-Moving Cleaning:</strong>
Montreal's active rental market requires:
• End-of-lease deep cleaning
• Security deposit protection cleaning
• New tenant preparation
• Landlord inspection ready cleaning

<strong>Festival and Event Cleanup:</strong>
Montreal's festival season creates demand for:
• Pre-event property preparation
• Post-event cleanup services
• Short-term rental turnovers
• Corporate event space cleaning

<strong>Winter Service Considerations:</strong>
• De-icing salt damage prevention
• Snow boot and winter gear consideration
• Increased indoor air quality focus
• Heating system area cleaning

<strong>Quebec Regulatory Compliance:</strong>
Professional Montreal cleaning services must:
• Maintain proper provincial licensing
• Follow Quebec consumer protection laws
• Provide bilingual contracts and communication
• Meet provincial insurance requirements
• Comply with environmental regulations`
  },
  {
    id: 16,
    title: "Move-In Move-Out Cleaning: Complete Transition Guide",
    excerpt: "Everything you need to know about move-in and move-out cleaning services to ensure smooth transitions and deposit returns.",
    image: "https://images.unsplash.com/photo-1558618666-2c2c4eb92d1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "13 min",
    category: "Moving",
    content: `Moving is stressful enough without worrying about cleaning. Professional move-in and move-out cleaning services ensure you get your security deposit back and start fresh in your new home.

<strong>Move-Out Cleaning: Getting Your Deposit Back</strong>

<strong>Why Professional Move-Out Cleaning Matters:</strong>
• Landlords expect professional-level cleanliness
• DIY cleaning often misses critical areas
• Professional cleaning provides documentation
• Saves time during already stressful moving process
• Typically pays for itself through deposit recovery

<strong>Standard Move-Out Cleaning Checklist:</strong>

<strong>Kitchen Deep Clean:</strong>
• Inside and outside of all appliances
• Cabinet interiors and exteriors
• Countertops and backsplashes
• Sink and faucet (remove mineral deposits)
• Light fixtures and ceiling fans
• Floor cleaning (including under appliances)

<strong>Bathroom Intensive Clean:</strong>
• Toilet inside and out (including behind)
• Shower/tub with grout cleaning
• Mirror and light fixtures
• Cabinet cleaning inside and out
• Floor and baseboard cleaning
• Exhaust fan cleaning

<strong>Living Areas and Bedrooms:</strong>
• Baseboards and window sills
• Light switches and outlet covers
• Closet cleaning (including shelves)
• Window cleaning (inside)
• Carpet deep cleaning or hard floor polishing
• Wall spot cleaning

<strong>Move-In Cleaning: Starting Fresh</strong>

<strong>Why Clean Before Unpacking:</strong>
• Previous tenant's cleaning may be inadequate
• Construction dust from any recent work
• Opportunity to sanitize before your belongings arrive
• Easier to clean empty spaces thoroughly
• Peace of mind for family health

<strong>Move-In Cleaning Priorities:</strong>

<strong>Immediate Health and Safety:</strong>
• Bathroom sanitization
• Kitchen deep clean and sanitization
• Air vent cleaning
• Light fixture cleaning
• Floor cleaning and sanitization

<strong>Before Furniture Arrival:</strong>
• Carpet deep cleaning or floor refinishing
• Inside closet and cabinet cleaning
• Window cleaning (inside and out)
• Deep clean of all surfaces
• Final walk-through inspection

<strong>Timing Your Cleaning Services:</strong>

<strong>Optimal Scheduling:</strong>
• Move-out cleaning: 1-2 days before final walkthrough
• Move-in cleaning: Day before or day of furniture delivery
• Same-day turnover possible with professional services
• Coordinate with moving company schedules

<strong>Pricing for Move-In/Move-Out Services:</strong>

<strong>Studio/1 Bedroom:</strong> $150-250
<strong>2 Bedroom:</strong> $200-300
<strong>3 Bedroom:</strong> $250-400
<strong>4+ Bedroom:</strong> $300-500+

<strong>Additional Services (Extra Cost):</strong>
• Carpet cleaning: $25-50 per room
• Inside oven cleaning: $30-50
• Inside refrigerator: $20-40
• Garage cleaning: $50-100
• Basement cleaning: $40-80

<strong>Landlord Communication:</strong>
• Provide cleaning receipts to landlord
• Schedule final walkthrough after cleaning
• Document cleaning with photos
• Keep all cleaning service documentation
• Professional cleaning often satisfies lease requirements`
  },
  {
    id: 17,
    title: "Post-Construction Cleaning: From Dust to Shine",
    excerpt: "Specialized post-construction and renovation cleaning services to transform your newly built or renovated space.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "10 min",
    category: "Construction",
    content: `Post-construction cleaning is a specialized service that requires specific equipment, techniques, and expertise. Whether you've completed a major renovation or built a new home, professional post-construction cleaning ensures your space is safe, clean, and move-in ready.

<strong>Why Professional Post-Construction Cleaning is Essential:</strong>

<strong>Health and Safety Concerns:</strong>
• Construction dust contains harmful particles
• Debris can cause injury if not properly removed
• Chemical residues from construction materials
• Proper disposal of construction waste required
• Professional equipment needed for thorough cleaning

<strong>Types of Post-Construction Cleaning:</strong>

<strong>1. Rough Construction Cleaning:</strong>
• Performed during construction phases
• Debris removal and basic cleaning
• Preparation for next construction phase
• Safety maintenance during building process

<strong>2. Final Construction Cleaning:</strong>
• Comprehensive cleaning after construction completion
• Detailed cleaning of all surfaces
• Removal of all construction residue
• Preparation for final inspection
• Move-in ready condition

<strong>3. Touch-Up Cleaning:</strong>
• Final detail cleaning after punch list completion
• Addressing any remaining construction residue
• Perfect condition for occupancy
• Often required before warranty takes effect

<strong>Specialized Post-Construction Services:</strong>

<strong>Dust and Debris Removal:</strong>
• HEPA filtration systems
• Complete dust removal from all surfaces
• Air duct cleaning if necessary
• Removal of all construction debris
• Proper disposal of hazardous materials

<strong>Surface Restoration:</strong>
• Window cleaning (removal of paint, stickers, residue)
• Floor cleaning and polishing
• Fixture cleaning and polishing
• Wall cleaning and spot treatment
• Cabinet cleaning inside and out

<strong>Detailed Cleaning Areas:</strong>

<strong>Kitchen and Bathrooms:</strong>
• Complete appliance cleaning (inside and out)
• Plumbing fixture cleaning and polishing
• Tile and grout cleaning
• Cabinet cleaning (removing all dust and debris)
• Countertop polishing and sealing if needed

<strong>Living Areas:</strong>
• Baseboard and trim cleaning
• Light fixture cleaning and bulb installation
• Switch and outlet plate cleaning
• Hardwood floor cleaning and polishing
• Carpet cleaning if installed

<strong>Post-Construction Cleaning Timeline:</strong>

<strong>Day 1-2: Initial Assessment and Heavy Cleaning</strong>
• Debris removal
• Heavy dust cleaning
• Surface preparation
• Safety assessment

<strong>Day 3-4: Detailed Cleaning</strong>
• Complete surface cleaning
• Fixture polishing
• Floor restoration
• Window cleaning

<strong>Day 5: Final Inspection and Touch-Up</strong>
• Quality control inspection
• Final detail work
• Client walkthrough
• Warranty discussion

<strong>Post-Construction Cleaning Pricing:</strong>

<strong>Residential Projects:</strong>
• New Construction: $0.30-0.50 per square foot
• Major Renovation: $0.25-0.45 per square foot
• Kitchen/Bathroom Remodel: $300-800 per room
• Basement Finishing: $200-500

<strong>What's Included:</strong>
• All cleaning supplies and equipment
• Debris removal and disposal
• Multiple cleaning phases if needed
• Final quality inspection
• Touch-up service within 48 hours

<strong>Choosing the Right Post-Construction Cleaner:</strong>
• Experience with construction cleaning
• Proper insurance for construction sites
• HEPA-equipped vacuum systems
• Understanding of construction materials
• Ability to work with contractors and schedules`
  },
  {
    id: 18,
    title: "Small Business Cleaning Services: Affordable Solutions",
    excerpt: "Cost-effective cleaning solutions designed specifically for small businesses, startups, and home offices.",
    image: "https://images.unsplash.com/photo-1556741533-974f8e62a92d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Usman Ahmad",
    readTime: "8 min",
    category: "Small Business",
    content: `Small businesses need professional cleaning services but often work with tighter budgets than large corporations. Understanding your options helps you maintain a professional environment without breaking the bank.

<strong>Why Small Businesses Need Professional Cleaning:</strong>

<strong>1. Professional Image:</strong>
• First impressions matter to clients and customers
• Clean spaces reflect attention to detail
• Professional environment boosts employee morale
• Compliance with health and safety standards

<strong>2. Employee Health and Productivity:</strong>
• Reduced sick days through proper sanitization
• Improved air quality and cleaner work environment
• Less distraction from cleaning duties
• More time to focus on core business activities

<strong>Small Business Cleaning Service Options:</strong>

<strong>1. Weekly Service Plans:</strong>
• Most cost-effective for regular maintenance
• Consistent cleaning schedule
• Basic cleaning of all areas
• Trash removal and restroom maintenance

<strong>2. Bi-Weekly Service Plans:</strong>
• Good balance of cost and cleanliness
• Suitable for lower-traffic businesses
• Basic maintenance with periodic deep cleaning
• Popular choice for professional offices

<strong>3. Monthly Deep Cleaning:</strong>
• Budget-friendly option
• Intensive cleaning sessions
• Good for businesses with minimal foot traffic
• Supplement with daily employee maintenance

<strong>Customizable Service Packages:</strong>

<strong>Basic Package (Most Affordable):</strong>
• Trash removal and liner replacement
• Restroom cleaning and restocking
• Vacuum high-traffic areas
• Dust desks and common surfaces
• Kitchen/break room basic cleaning

<strong>Standard Package:</strong>
• Everything in Basic Package plus:
• Complete floor cleaning (mop and vacuum)
• Detailed dusting of all surfaces
• Glass and mirror cleaning
• Light fixture cleaning
• Monthly deep cleaning rotation

<strong>Premium Package:</strong>
• Everything in Standard Package plus:
• Carpet deep cleaning quarterly
• Window cleaning (interior)
• Detailed sanitization of all surfaces
• Supply and equipment maintenance
• Priority scheduling and emergency calls

<strong>Small Business Pricing Guide:</strong>

<strong>Office Spaces (Under 2,000 sq ft):</strong>
• Weekly Service: $100-200 per visit
• Bi-Weekly Service: $120-250 per visit
• Monthly Service: $200-400 per visit

<strong>Retail Spaces:</strong>
• Daily Light Cleaning: $50-100 per visit
• Weekly Deep Clean: $150-300 per visit
• High-traffic areas require more frequent service

<strong>Medical/Professional Offices:</strong>
• Higher sanitization standards
• Weekly Service: $150-300 per visit
• Specialized cleaning products required
• Compliance with health regulations

<strong>Cost-Saving Tips for Small Businesses:</strong>

• <strong>Bundle Services:</strong> Combine multiple services for better rates
• <strong>Longer Contracts:</strong> 6-12 month agreements often offer discounts
• <strong>Off-Peak Scheduling:</strong> Evening or weekend cleaning may cost less
• <strong>Supply Your Own Products:</strong> Some companies offer discounts
• <strong>Group Buying:</strong> Team up with neighboring businesses

<strong>Questions to Ask Cleaning Services:</strong>

• Do you offer small business discounts?
• Can we customize the service package?
• What's included in your basic service?
• Do you provide supplies and equipment?
• How flexible is your scheduling?
• What are your insurance and bonding coverage?
• Do you offer emergency cleaning services?

<strong>ROI of Professional Cleaning:</strong>
While professional cleaning is an expense, consider the return on investment:
• Employee productivity gains
• Reduced sick days and health costs
• Professional image leading to better client relationships
• Time savings allowing focus on revenue-generating activities
• Potential tax deductions for business cleaning expenses`
  },
];

const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

// A simple title case function
const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Floating Icon Component
const FloatingIcon = ({ icon, top, left, delay }: { icon: React.ReactNode, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute text-cyan-200/30"
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
  >
    {icon}
  </motion.div>
);

const CharacterAnimation = ({ text }: { text: string }) => {
  const characters = text.split("");
  return (
    <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-purple-700 to-pink-600 text-transparent bg-clip-text tracking-tighter">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          style={{ display: 'inline-block' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}

export default function CleaningBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const filteredPosts = blogPosts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post =>
      selectedCategory === "All" || post.category === selectedCategory
    );

  const heroRef = React.useRef<HTMLDivElement>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="container mx-auto p-4 md:p-8">
          <motion.button
            onClick={() => setSelectedPost(null)}
            className="mb-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &larr; Back to Blog
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Enhanced Header Image with Overlay */}
            <div className="relative">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-64 md:h-96 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Floating Category Badge */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                {selectedPost.category}
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center text-white/90 text-sm space-x-4">
                  <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <User className="w-4 h-4 mr-1.5" /> 
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1.5" /> 
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-6 md:p-12">
              {/* Excerpt */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 border-l-4 border-blue-500">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  {selectedPost.excerpt}
                </p>
              </div>
              
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed article-content"
                dangerouslySetInnerHTML={{ 
                  __html: formatBlogContent(selectedPost.content)
                }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8'
                }}
              />
              
              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enjoyed this article?</h3>
                    <p className="text-gray-600">Share it with others who might find it helpful!</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <span className="text-sm font-bold">f</span>
                    </button>
                    <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <span className="text-sm font-bold">t</span>
                    </button>
                    <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                      <span className="text-sm font-bold">w</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <style jsx>{`
                .article-content strong {
                  font-weight: 700;
                  color: #1f2937;
                  font-size: 1.1em;
                  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
                
                .article-content p {
                  margin-bottom: 1.5rem;
                }
                
                .article-content ul {
                  margin: 1.5rem 0;
                  padding-left: 2rem;
                }
                
                .article-content li {
                  margin-bottom: 0.75rem;
                  line-height: 1.7;
                  position: relative;
                }
                
                .article-content li::before {
                  content: "✨";
                  position: absolute;
                  left: -1.5rem;
                  top: 0;
                }
                
                .article-content br {
                  display: block;
                  content: "";
                  margin: 0.75rem 0;
                }
                
                .line-clamp-2 {
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
                
                .line-clamp-3 {
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/70 to-white/70 text-gray-800 font-sans relative overflow-hidden backdrop-blur-sm">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 -left-4 w-36 h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: 'pulse 8s infinite ease-in-out',
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>
      
      {/* Add background cleaning pattern */}
      <div 
        className="absolute inset-0 opacity-[0.10]" 
        style={{
          backgroundImage: 'url(/images/backgrounds/cleaning-icons-pattern.png)',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundBlendMode: 'normal',
          transform: 'scale(1.05)',
        }}
      ></div>
      <div className="absolute inset-0 bg-transparent"></div>
      
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative py-24 md:py-32 px-4 overflow-hidden"
      >
        {/* Parallax icons */}
        <motion.div style={{ x: mousePosition.x * 0.05, y: mousePosition.y * 0.05, position: 'absolute', top: '10%', left: '10%' }}>
          <Wind className="w-16 h-16 text-purple-500/20" />
        </motion.div>
        <motion.div style={{ x: mousePosition.x * -0.03, y: mousePosition.y * -0.03, position: 'absolute', top: '20%', right: '15%' }}>
          <Sparkles className="w-12 h-12 text-purple-500/20" />
        </motion.div>
        <motion.div style={{ x: mousePosition.x * 0.02, y: mousePosition.y * -0.04, position: 'absolute', bottom: '15%', left: '20%' }}>
          <Droplet className="w-14 h-14 text-purple-500/20" />
        </motion.div>
        <motion.div style={{ x: mousePosition.x * -0.05, y: mousePosition.y * 0.02, position: 'absolute', bottom: '25%', right: '25%' }}>
          <Wind className="w-10 h-10 text-purple-500/20" />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <CharacterAnimation text="The Ultimate Cleaning Blog" />
          <motion.div
            className="mt-4 text-xl max-w-3xl mx-auto text-slate-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm">
              Your one-stop resource for cleaning tips, tricks, and home-keeping hacks.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto p-4 md:p-8 relative z-10">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-blue-100"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ⭐ Featured
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4 space-x-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {filteredPosts[0].category}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl self-start"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPost(filteredPosts[0])}
                  >
                    Read Full Article
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Cleaning Tips & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-3 transition-all duration-300 group cursor-pointer hover:shadow-2xl border border-gray-100 relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                onClick={() => setSelectedPost(post)}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-br-full"></div>
                
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-blue-100">
                    {post.category}
                  </div>
                  
                  {/* Category Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    {post.category === 'Tips & Tricks' && <PiSparkle className="w-5 h-5 text-blue-600" />}
                    {post.category === 'Eco-Friendly' && <FiFeather className="w-5 h-5 text-green-600" />}
                    {post.category === 'Deep Cleaning' && <PiSprayBottle className="w-5 h-5 text-purple-600" />}
                    {post.category === 'Checklists' && <Tag className="w-5 h-5 text-orange-600" />}
                    {post.category === 'Habits' && <FiSun className="w-5 h-5 text-yellow-600" />}
                    {post.category === 'DIY' && <Droplet className="w-5 h-5 text-indigo-600" />}
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-white to-gray-50/50">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center font-medium bg-gray-100 px-3 py-1 rounded-full">
                      <User className="w-4 h-4 mr-1.5"/>
                      {post.author}
                    </span>
                    <span className="flex items-center font-medium bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                      <Clock className="w-4 h-4 mr-1.5"/>
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/btn">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all shadow-lg">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl mb-2">No articles found.</p>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-16 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready for a <span className="text-yellow-300">Spotless</span> Home?
            </h2>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Let our professional team take care of the cleaning for you. Get a free, no-obligation quote today and experience the difference our expert cleaning services can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact-us'}
              >
                Get Your Free Quote
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600 transition-all shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/services'}
              >
                View Our Services
              </motion.button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Professional Team</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Eco-Friendly Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
} 