<?php
/**
 * Template Name: Luxury Editorial Post with Interactive Sidebar
 * Description: A highly polished, premium magazine-style single post template featuring interactive utility bars.
 *
 * @package Podcaster
 * @since 1.0
 */

/* Loads the header.php template */
get_header();

$thst_wp_version   = get_bloginfo( 'version' );
$pod_plugin_active = pod_get_plugin_active();
$format            = get_post_format();

if ( 'ssp' === $pod_plugin_active ) {
	$format = pod_ssp_get_format( $post->ID );
}

$thump_cap            = pod_the_post_thumbnail_caption();
$featured_post_header = get_post_meta( $post->ID, 'cmb_thst_feature_post_img', true );
$image                = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
$header_img           = ! empty( $image[0] ) ? $image[0] : '';
$posttype             = get_post_type();

$pod_blog_layout                  = pod_theme_option( 'pod-blog-layout', 'sidebar-right' );
$gallerystyle_global              = pod_theme_option( 'pod-pofo-gallery', 'slideshow_on' );
$pod_sticky_header                = pod_theme_option( 'pod-sticky-header', false );
$pod_single_header_display        = pod_theme_option( 'pod-single-header-display', 'has-thumbnail' );
$pod_single_header_thumb_embed    = pod_theme_option( 'pod-single-header-thumbnail-audio-embed', true );
$pod_single_header_thumb_playlist = pod_theme_option( 'pod-single-header-thumbnail-audio-playlist', true );
$pod_header_thumb_size            = pod_theme_option( 'pod-single-header-thumbnail-size', 'thumb-size-small' );
$pod_header_thumb_radius          = pod_theme_option( 'pod-single-header-thumbnail-radius', 'straight-corners' );
$pod_single_header_par            = pod_theme_option( 'pod-single-header-par', false );
$pod_single_header_bgstyle        = pod_theme_option( 'pod-single-bg-style', 'background-repeat:repeat;' );
$pod_header_par                   = pod_theme_option( 'pod-single-header-par', false );
$pod_single_video_bg              = pod_theme_option( 'pod-single-video-bg', false );
$pod_players_preload              = pod_theme_option( 'pod-players-preload', 'none' );

/* Player position */
$pod_single_audio_player_position = pod_theme_option( 'pod-single-header-player-display', 'player-in-header' );
$pod_ssp_meta                     = pod_theme_option( 'pod-ssp-meta-data', false );
$has_thumb                        = ( has_post_thumbnail() && 'has-thumbnail' === $pod_single_header_display ) ? ' with_thumbnail' : '';

$ssp_single_sticky    = ( true === $pod_sticky_header ) ? 'sticky' : '';
$pod_single_header_bg = ( has_post_thumbnail() && 'has-background' === $pod_single_header_display && 'audio' === $format ) ? 'thumb_bg' : '';
$ssp_single_header_bg = ( has_post_thumbnail() && 'has-background' === $pod_single_header_display && 'podcast' === $posttype ) ? 'thumb_bg' : '';
$pod_single_bg_img    = ( has_post_thumbnail() && 'has-background' === $pod_single_header_display ) ? 'background-image: url(' . esc_url( $header_img ) . ');' : '';
$ssp_single_thumb_style = ( has_post_thumbnail() && 'has-thumbnail' === $pod_single_header_display ) ? ' with_thumbnail' : '';

$bpp_single_sticky      = ( true === $pod_sticky_header ) ? 'sticky' : ''; 
$bpp_single_header_bg   = ( has_post_thumbnail() && 'has-background' === $pod_single_header_display && 'audio' === $format ) ? 'thumb_bg' : '';
$bpp_single_bg_img      = ( has_post_thumbnail() && 'has-background' === $pod_single_header_display ) ? 'background-image: url(' . esc_url( $header_img ) . ');' : '';
$bpp_single_thumb_style = ( has_post_thumbnail() && 'has-thumbnail' === $pod_single_header_display ) ? ' with_thumbnail' : '';

$audiotype      = get_post_meta( $post->ID, 'cmb_thst_audio_type', true );
$audiourl       = get_post_meta( $post->ID, 'cmb_thst_audio_url', true );
$audioembed     = get_post_meta( $post->ID, 'cmb_thst_audio_embed', true );
$audioembedcode = get_post_meta( $post->ID, 'cmb_thst_audio_embed_code', true );
$audiocapt      = get_post_meta( $post->ID, 'cmb_thst_audio_capt', true );
$audioplists    = get_post_meta( $post->ID, 'cmb_thst_audio_playlist', true );
$audioex        = get_post_meta( $post->ID, 'cmb_thst_audio_explicit', true );

$videotype      = get_post_meta( $post->ID, 'cmb_thst_video_type', true );		
$videoembed     = get_post_meta( $post->ID, 'cmb_thst_video_embed', true );
$videourl       = get_post_meta( $post->ID, 'cmb_thst_video_url', true );
$videocapt      = get_post_meta( $post->ID, 'cmb_thst_video_capt', true );
$videothumb     = get_post_meta( $post->ID, 'cmb_thst_video_thumb', true );
$videoplists    = get_post_meta( $post->ID, 'cmb_thst_video_playlist', true );
$videoembedcode = get_post_meta( $post->ID, 'cmb_thst_video_embed_code', true );
$videoex        = get_post_meta( $post->ID, 'cmb_thst_video_explicit', true );

$gallerystyle = get_post_meta( $post->ID, 'cmb_thst_post_gallery_style', true );
$galleryimgs  = get_post_meta( $post->ID, 'cmb_thst_gallery_list', true );
$gallerycapt  = get_post_meta( $post->ID, 'cmb_thst_gallery_capt', true );
$gallerycol   = get_post_meta( $post->ID, 'cmb_thst_gallery_col', true );

$pod_sc_player = pod_theme_option( 'pod-audio-soundcloud-player-style', 'sc-classic-player' );

$mediatype = '';
if ( 'audio' === $format ) {
	$mediatype = $audiotype;
} elseif ( 'video' === $format ) {
	$mediatype = $videotype;
}

if ( 'audio-embed-url' === $audiotype || 'audio-embed-code' === $audiotype ) {
	$has_thumb_embed = ( $pod_single_header_thumb_embed ) ? 'audio-embed-thumbnail-active' : 'audio-embed-thumbnail-inactive';
} else {
	$has_thumb_embed = '';
}

if ( 'audio-playlist' === $audiotype ) {
	$has_thumb_playlist = ( $pod_single_header_thumb_playlist ) ? 'audio-playlist-thumbnail-active' : 'audio-playlist-thumbnail-inactive';
} else {
	$has_thumb_playlist = '';
}

/* Check for sidebars */
$pod_is_sidebar_active = is_active_sidebar( 'sidebar_single' ) ? 'pod-is-sidebar-active' : 'pod-is-sidebar-inactive';

/* Calming Reader Helper: Reading Time Calculation */
$post_content     = get_post_field( 'post_content', $post->ID );
$word_count       = str_word_count( strip_tags( $post_content ) );
$reading_time     = ceil( $word_count / 200 ); // Assumes average 200 words per minute
$reading_time_str = sprintf( _n( '%d min read', '%d mins read', $reading_time, 'podcaster' ), $reading_time );

$who_is_dennis_img = 'https://theanxietyguy.com/wp-content/uploads/2020/11/the_anxiety_Guy_masterclass_1.jpg';
?>

<!-- STEP 1: PRELOADER STYLING, ACCESSIBILITY DEFAULTS & CLEANUP -->
<style>
  #refresh-loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s ease-out, visibility 0.4s ease-out;
  }
  
  .refresh-spinner {
    width: 44px;
    height: 44px;
    border: 3.5px solid #e2e8f0;
    border-top: 3.5px solid #296bb1;
    border-radius: 50%;
    animation: refresh-spin 0.8s linear infinite;
  }

  @keyframes refresh-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .homepage-match-wrapper {
    opacity: 0;
    transition: opacity 0.45s ease-in-out;
  }
  
  .homepage-match-wrapper.loaded {
    opacity: 1;
  }

  /* Drop-cap configuration: Classic, stylish serif box drop-cap */
  .editorial-prose > p:first-of-type::first-letter {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    font-weight: 800;
    float: left;
    line-height: 0.95;
    margin-top: 0.2rem;
    margin-right: 0.75rem;
    color: #1e293b;
  }

  /* Dynamic Calm Focus Mode transitions */
  .calm-mode-transition {
    transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
  }

  /* CSS PRECAUTION: We swap 'overflow-x: hidden' with 'clip' to allow elements with position: sticky to work correctly */
  body, html, .homepage-match-wrapper, #page, .site, .site-content {
      overflow-x: clip !important;
      overflow-y: visible !important;
  }

  /* CLEANUP: Removes duplicated post-format title elements dynamically */
  #article-body-content h1:first-of-type,
  #article-body-content h2:first-of-type,
  #article-body-content .entry-title,
  #article-body-content .post-title,
  #article-body-content .post-header {
      display: none !important;
  }
</style>

<div id="refresh-loader-overlay">
  <div class="refresh-spinner"></div>
</div>

<!-- STEP 2: LOAD PREMIUM TYPOGRAPHY -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,400&family=Satisfy&display=swap" rel="stylesheet">

<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brandNavy: '#1e293b',
          brandBlue: '#296bb1',       
          brandCardBlue: '#3774b6',   
          brandGreen: '#6b9351',      
          brandPurple: '#7968ad',     
          brandOrange: '#dd8837',     
          brandHeadingBlue: '#3c569c', 
        },
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          cursive: ['"Satisfy"', 'cursive'],
        }
      }
    }
  }
</script>

<!-- STEP 3: MAIN TEMPLATE CONTAINER -->
<div class="homepage-match-wrapper bg-white font-sans text-gray-800 antialiased min-h-screen calm-mode-transition" id="page-global-container">
	
	<!-- PREMIUM EDITORIAL TOP HEADER BOUNDARY -->
	<header class="border-b-4 border-double border-slate-200 py-12 lg:py-20 bg-[#FAF9F5] calm-mode-transition" id="editorial-header">
		<div class="max-w-[1440px] mx-auto px-6">
			<div class="max-w-4xl space-y-5 border-l-4 border-brandGreen pl-6 lg:pl-8">
				<div class="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-brandBlue">
					<span><?php echo esc_html( get_the_date() ); ?></span>
					<span>&bull;</span>
					<span class="text-brandGreen"><?php echo esc_html( $reading_time_str ); ?></span>
				</div>
				<h1 id="article-title" class="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold text-brandNavy tracking-tight leading-[1.1]">
					<?php echo esc_html( get_the_title() ); ?>
				</h1>
			</div>
		</div>
	</header>

	<!-- STEP 4: EDITORIAL GRID LAYOUT -->
	<div class="max-w-[1440px] mx-auto px-6">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-slate-200">
			
			<!-- Left Column: FLOATING CONTROL CONSOLE (Left column expands to allow internal sticky div to float) -->
			<aside class="hidden lg:block lg:col-span-2 py-12 pr-8 border-r border-slate-200 relative calm-mode-transition" id="editorial-sidebar-left">
				<div class="sticky top-24 space-y-8 flex flex-col items-center">
					
					<!-- Floating Interactive Scrolling Progress Ring -->
					<div class="flex flex-col items-center space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm w-full calm-mode-transition" id="sidebar-progress-card">
						<div class="relative w-16 h-16">
							<svg class="w-full h-full transform -rotate-90">
								<circle cx="32" cy="32" r="28" stroke="#e2e8f0" stroke-width="3.5" fill="transparent" />
								<circle id="scroll-progress-ring" cx="32" cy="32" r="28" stroke="#296bb1" stroke-width="4" fill="transparent"
									stroke-dasharray="175.92" stroke-dashoffset="175.92" class="transition-all duration-75" />
							</svg>
							<div class="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-brandNavy" id="progress-percent">
								0%
							</div>
						</div>
						<p class="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 text-center">Reading Progress</p>
					</div>

					<!-- Auto Reader (Text-to-Speech) Toggle Button -->
					<div class="space-y-3 w-full text-center">
						<p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Accessibility</p>
						<button id="tts-toggle-btn" onclick="toggleTextToSpeech()" class="w-full bg-[#f1f5f8] border border-blue-100 hover:bg-brandBlue hover:text-white hover:border-brandBlue text-brandBlue text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
							<svg id="tts-icon" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
							<span id="tts-label">Listen to Article</span>
						</button>
					</div>

					<div class="h-px bg-slate-100 w-full calm-mode-transition" id="divider-1"></div>

					<!-- Cool Feature #1: Anxiety-Friendly Calm Mode Dimmer -->
					<div class="space-y-3 w-full text-center">
						<p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Calm Mode</p>
						<button id="calm-mode-btn" onclick="toggleCalmMode()" class="w-full bg-[#FCFAF5] border border-orange-100/80 hover:bg-orange-100 hover:text-amber-900 text-[#855e42] text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636m12.728 12.728A9 9 0 015.636 5.636"/></svg>
							<span id="calm-mode-label">Warm Dimmer</span>
						</button>
					</div>

					<div class="h-px bg-slate-100 w-full calm-mode-transition" id="divider-2"></div>

					<!-- Cool Feature #2: Instant Text Size Resizer -->
					<div class="space-y-3 w-full text-center">
						<p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Adjust Font Size</p>
						<div class="flex gap-2 justify-center">
							<button onclick="adjustFontSize(-1)" class="w-10 h-10 bg-slate-50 border border-slate-100 hover:bg-slate-200 text-brandNavy font-extrabold rounded-lg flex items-center justify-center text-sm shadow-sm transition-all duration-200 calm-mode-transition">
								A-
							</button>
							<button onclick="adjustFontSize(1)" class="w-10 h-10 bg-slate-50 border border-slate-100 hover:bg-slate-200 text-brandNavy font-extrabold rounded-lg flex items-center justify-center text-sm shadow-sm transition-all duration-200 calm-mode-transition">
								A+
							</button>
						</div>
					</div>

				</div>
			</aside>

			<?php 
			/* Resolve Column layouts dynamically based on sidebar configuration */
			$main_col_span = 'lg:col-span-10 py-12 lg:pl-10 max-w-4xl mx-auto w-full';
			if ( 'sidebar-right' === $pod_blog_layout && is_active_sidebar( 'sidebar_single' ) ) {
				$main_col_span = 'lg:col-span-7 py-12 lg:px-10';
			} elseif ( 'sidebar-left' === $pod_blog_layout && is_active_sidebar( 'sidebar_single' ) ) {
				$main_col_span = 'lg:col-span-7 py-12 lg:px-10 order-last border-r border-slate-200';
			}
			?>

			<!-- CENTRAL CONTENT AREA -->
			<main class="<?php echo esc_attr( $main_col_span ); ?>" id="editorial-scroll-anchor">
				
				<!-- Mobile Accessibility Helper Panel (Visible on Mobile Only) -->
				<div class="block lg:hidden mb-10 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-xs font-bold text-brandNavy">Need an Audio Version?</p>
							<p class="text-[11px] text-gray-500">Listen hands-free using your browser reader.</p>
						</div>
						<button onclick="toggleTextToSpeech()" class="bg-brandBlue text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm">
							<span id="tts-label-mobile">Listen</span>
						</button>
					</div>
					<div class="flex items-center justify-between pt-3 border-t border-slate-200 space-x-2">
						<span class="text-xs font-bold text-brandNavy">Reading Comforts:</span>
						<div class="flex gap-2">
							<button onclick="toggleCalmMode()" class="bg-[#fcfaf2] border border-orange-100 text-[#855e42] text-[10px] font-bold py-1 px-3 rounded">
								Warm Light
							</button>
							<button onclick="adjustFontSize(-1)" class="bg-slate-200 text-xs font-bold py-1 px-2.5 rounded">A-</button>
							<button onclick="adjustFontSize(1)" class="bg-slate-200 text-xs font-bold py-1 px-2.5 rounded">A+</button>
						</div>
					</div>
				</div>

				<!-- MAIN EDITORIAL CONTENT -->
				<div id="article-body-content" class="editorial-prose prose prose-slate max-w-none text-gray-700 font-sans leading-relaxed transition-all duration-300
					prose-headings:text-brandNavy prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
					prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-8
					prose-a:text-brandBlue prose-a:font-semibold prose-a:underline hover:prose-a:text-brandHeadingBlue prose-a:transition-all
					prose-blockquote:border-l-0 prose-blockquote:bg-[#FAF9F5] prose-blockquote:p-8 prose-blockquote:rounded-xl prose-blockquote:text-center prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-brandNavy prose-blockquote:text-xl prose-blockquote:shadow-inner prose-blockquote:border-t-2 prose-blockquote:border-b-2 prose-blockquote:border-brandGreen/20">
					
					<?php
					if ( have_posts() ) :
						while ( have_posts() ) : the_post();
							get_template_part( 'post/format', $format );
							pod_set_post_views( get_the_ID() );
						endwhile;	
					endif;
					?>

				</div>

				<!-- SPOTLIGHT BIO DESIGN: COLUMNIST COLUMN STYLE -->
				<section class="mt-20 pt-12 border-t border-slate-200">
					<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
						
						<!-- Grayscale portrait with custom offset layout shadow -->
						<div class="md:col-span-4">
							<div class="relative bg-white p-3 rounded-2xl shadow-md border border-slate-100 relative group overflow-hidden">
								<div class="absolute inset-0 bg-brandGreen/10 rounded-2xl translate-x-2.5 translate-y-2.5 pointer-events-none -z-10 group-hover:bg-brandBlue/10 transition-colors duration-300"></div>
								<img src="<?php echo esc_url( $who_is_dennis_img ); ?>" alt="Dennis profile" class="w-full h-auto rounded-xl object-cover transition duration-500 filter grayscale hover:grayscale-0">
							</div>
						</div>

						<div class="md:col-span-8 space-y-4">
							<span class="text-[10px] font-bold uppercase tracking-widest text-brandGreen bg-emerald-50 px-3.5 py-1.5 rounded inline-block">Author & Mentor</span>
							<h4 class="font-serif text-2xl font-bold text-brandNavy"><?php the_author(); ?></h4>
							
							<div class="space-y-3 text-gray-600 text-sm leading-relaxed">
								<p>
									I understand how you feel; <a href="https://www.amazon.com/Fuck-Coping-Start-Healing-Anxiety-ebook/dp/B086JBWCXX" class="text-brandBlue font-semibold underline hover:text-[#1c4b7d]" target="_blank" rel="noopener noreferrer">I have been there</a>. Generalized anxiety turned to panic disorder, and panic disorder turned to health anxiety.
								</p>
								<p>
									It was a painful and sometimes hopeless time, until I built a structured approach to reverse my negative thinking patterns and build long-term, inner calm.
								</p>
							</div>

							<!-- Cursive handwritten sign-off (matches homepage style guide) -->
							<div class="pt-2">
								<p class="font-cursive text-3xl text-brandBlue leading-tight">You can recover. And I can help.</p>
								<p class="text-xs uppercase tracking-wider mt-1 opacity-80 font-bold text-brandNavy">— Dennis Simsek</p>
							</div>
						</div>

					</div>
				</section>

				<!-- BOTTOM RECOVERY CTA (MATCHES HEALTH ANXIETY PROGRAM HOME CARD) -->
				<section class="mt-16 bg-[#f4f7f0] rounded-2xl p-8 md:p-12 shadow-sm border border-emerald-100/50 flex flex-col md:flex-row justify-between items-center gap-8">
					<div class="space-y-3 text-center md:text-left max-w-xl">
						<h3 class="text-xl md:text-2xl font-extrabold text-brandNavy">Ready to start your recovery path?</h3>
						<p class="text-gray-600 text-sm leading-relaxed">Dennis has spent over 15 years developing step-by-step masterclasses to reverse symptom checking, panic attacks, and intrusive thought patterns.</p>
					</div>
					<a href="https://theanxietyguy.com/all-programs/" class="inline-flex items-center justify-center gap-2 bg-brandGreen text-white text-sm font-bold py-3.5 px-6 rounded-md hover:opacity-95 transition duration-200 shadow-sm flex-shrink-0">
						Explore Programs
						<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
					</a>
				</section>

			</main>

			<!-- RIGHT SIDEBAR -->
			<?php if ( ( 'sidebar-right' === $pod_blog_layout || 'sidebar-left' === $pod_blog_layout ) && is_active_sidebar( 'sidebar_single' ) ) : ?>
				<aside class="lg:col-span-3 py-12 lg:pl-8 border-l border-slate-200" role="complementary">
					<div class="sticky top-12 space-y-6">
						<h4 class="text-xs uppercase tracking-widest font-extrabold text-brandNavy pb-3 border-b border-slate-200 mb-4">Supportive Materials</h4>
						<?php get_template_part( 'sidebar' ); ?>
					</div>
				</aside>
			<?php endif; ?>

		</div>
	</div>
</div>

<!-- STEP 5: RUNTIME INTERACTIVE CONTROLS -->
<script>
  // Global speech synthesis variables
  let speechSynthInstance = window.speechSynthesis;
  let currentUtterance = null;
  let isSpeaking = false;

  function toggleTextToSpeech() {
    if (!speechSynthInstance) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    const labelDesktop = document.getElementById('tts-label');
    const labelMobile = document.getElementById('tts-label-mobile');

    if (isSpeaking) {
      speechSynthInstance.cancel();
      isSpeaking = false;
      updateTTSUI(false);
    } else {
      const contentEl = document.getElementById('article-body-content');
      const titleEl = document.getElementById('article-title');
      
      let textToRead = "";
      if (titleEl) textToRead += titleEl.innerText + ". ";
      if (contentEl) textToRead += contentEl.innerText;

      if (!textToRead.trim()) {
        alert("No readable text found.");
        return;
      }

      currentUtterance = new SpeechSynthesisUtterance(textToRead);
      currentUtterance.rate = 1.0; 
      currentUtterance.pitch = 1.0;

      currentUtterance.onend = function() {
        isSpeaking = false;
        updateTTSUI(false);
      };

      currentUtterance.onerror = function() {
        isSpeaking = false;
        updateTTSUI(false);
      };

      speechSynthInstance.speak(currentUtterance);
      isSpeaking = true;
      updateTTSUI(true);
    }
  }

  function updateTTSUI(active) {
    const labelDesktop = document.getElementById('tts-label');
    const labelMobile = document.getElementById('tts-label-mobile');
    
    if (active) {
      if (labelDesktop) labelDesktop.innerText = "Stop Reading";
      if (labelMobile) labelMobile.innerText = "Stop";
    } else {
      if (labelDesktop) labelDesktop.innerText = "Listen to Article";
      if (labelMobile) labelMobile.innerText = "Listen";
      if (speechSynthInstance) speechSynthInstance.cancel();
    }
  }

  // Cool Thing #1: Calm Focus Mode (Soothing Visuals Dimmer)
  let isCalmModeActive = false;
  function toggleCalmMode() {
    const pageGlobal = document.getElementById('page-global-container');
    const headerEl = document.getElementById('editorial-header');
    const calmLabel = document.getElementById('calm-mode-label');
    
    // UI elements to dim borders/dividers with soft colors
    const sidebarLeft = document.getElementById('editorial-sidebar-left');
    const sidebarProgress = document.getElementById('sidebar-progress-card');
    const divider1 = document.getElementById('divider-1');
    const divider2 = document.getElementById('divider-2');

    if (!isCalmModeActive) {
      // Transition page to soothing warm-cream color space
      pageGlobal.style.backgroundColor = '#FAF6EE';
      pageGlobal.style.color = '#4a3728';
      if (headerEl) {
        headerEl.style.backgroundColor = '#f4eedf';
        headerEl.style.borderColor = '#e4dac9';
      }
      if (sidebarLeft) sidebarLeft.style.borderColor = '#e4dac9';
      if (sidebarProgress) {
        sidebarProgress.style.backgroundColor = '#f4eedf';
        sidebarProgress.style.borderColor = '#e4dac9';
      }
      if (divider1) divider1.style.backgroundColor = '#e4dac9';
      if (divider2) divider2.style.backgroundColor = '#e4dac9';
      if (calmLabel) calmLabel.innerText = "Bright Light";
      isCalmModeActive = true;
    } else {
      // Revert back to original clean white space
      pageGlobal.style.backgroundColor = '#ffffff';
      pageGlobal.style.color = '#1f2937';
      if (headerEl) {
        headerEl.style.backgroundColor = '#f8fafc';
        headerEl.style.borderColor = '#e2e8f0';
      }
      if (sidebarLeft) sidebarLeft.style.borderColor = '#e2e8f0';
      if (sidebarProgress) {
        sidebarProgress.style.backgroundColor = '#f8fafc';
        sidebarProgress.style.borderColor = '#f1f5f9';
      }
      if (divider1) divider1.style.backgroundColor = '#f1f5f9';
      if (divider2) divider2.style.backgroundColor = '#f1f5f9';
      if (calmLabel) calmLabel.innerText = "Warm Dimmer";
      isCalmModeActive = false;
    }
  }

  // Cool Thing #2: Font Sizer Adjustment logic
  let fontScaleIndex = 2; // Default is mid-level index
  const fontSizeScales = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];

  function adjustFontSize(dir) {
    const contentEl = document.getElementById('article-body-content');
    if (!contentEl) return;

    // Clear previous dynamic sizes
    fontSizeScales.forEach(sizeClass => contentEl.classList.remove(sizeClass));

    fontScaleIndex = Math.max(0, Math.min(fontSizeScales.length - 1, fontScaleIndex + dir));
    contentEl.classList.add(fontSizeScales[fontScaleIndex]);
  }

  (function() {
    function revealPage() {
      var wrapper = document.querySelector('.homepage-match-wrapper');
      var loader = document.getElementById('refresh-loader-overlay');
      if (wrapper) {
        wrapper.classList.add('loaded');
      }
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(function() {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 400);
      }
    }

    // Dynamic Duplicated Title Purger (Resolves doubled-up titles across all formats)
    function purgeDuplicatedTitle() {
      var mainTitleEl = document.getElementById('article-title');
      var contentArea = document.getElementById('article-body-content');
      if (!mainTitleEl || !contentArea) return;

      var mainTitleText = mainTitleEl.innerText.trim().toLowerCase();
      
      // Select prospective duplicate heading tags generated in templates
      var prospectiveHeadings = contentArea.querySelectorAll('h1, h2, h3, .entry-title, .post-title');
      prospectiveHeadings.forEach(function(heading) {
        if (heading.innerText.trim().toLowerCase() === mainTitleText) {
          heading.style.setProperty('display', 'none', 'important');
        }
      });
    }

    // Scroll progress tracker logic (Accurately syncs strictly with the article content coordinates)
    function initScrollTracker() {
      var progressRing = document.getElementById('scroll-progress-ring');
      var progressPercent = document.getElementById('progress-percent');
      var contentAnchor = document.getElementById('article-body-content'); // Focus strictly on body text coordinates

      if (!progressRing || !contentAnchor) return;

      var radius = parseFloat(progressRing.getAttribute('r'));
      var circumference = 2 * Math.PI * radius;

      window.addEventListener('scroll', function() {
        var rect = contentAnchor.getBoundingClientRect();
        var contentHeight = rect.height;
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Find absolute top position of the article relative to the document
        var anchorTop = rect.top + scrollTop; 
        var viewportHeight = window.innerHeight;

        // Progress begins when content enters perspective, completing exactly as bottom of text is reached
        var startScroll = anchorTop - (viewportHeight * 0.25); 
        var endScroll = anchorTop + contentHeight - viewportHeight;
        var totalScrollableDistance = endScroll - startScroll;
        var currentScrollDistance = scrollTop - startScroll;

        var progress = 0;
        if (totalScrollableDistance > 0) {
          progress = (currentScrollDistance / totalScrollableDistance) * 100;
        } else {
          progress = (scrollTop / (document.documentElement.scrollHeight - viewportHeight)) * 100;
        }
        
        progress = Math.max(0, Math.min(100, progress));

        var offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
        if (progressPercent) {
          progressPercent.textContent = Math.round(progress) + '%';
        }
      });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(function() {
        revealPage();
        purgeDuplicatedTitle();
        initScrollTracker();
      }, 150);
    } else {
      window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
          revealPage();
          purgeDuplicatedTitle();
          initScrollTracker();
        }, 150);
      });
      window.addEventListener('load', revealPage);
    }

    // Stop speech synthesis if user navigates away or closes page
    window.addEventListener('beforeunload', function() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
  })();
</script>

<?php 
get_footer(); // Imports your existing theme footer.php
?>