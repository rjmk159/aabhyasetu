<?php
/**
 * Astra functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Define Constants
 */
define( 'ASTRA_THEME_VERSION', '3.7.3' );
define( 'ASTRA_THEME_SETTINGS', 'astra-settings' );
define( 'ASTRA_THEME_DIR', trailingslashit( get_template_directory() ) );
define( 'ASTRA_THEME_URI', trailingslashit( esc_url( get_template_directory_uri() ) ) );


/**
 * Minimum Version requirement of the Astra Pro addon.
 * This constant will be used to display the notice asking user to update the Astra addon to the version defined below.
 */
define( 'ASTRA_EXT_MIN_VER', '3.6.0' );

/**
 * Setup helper functions of Astra.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-theme-options.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-theme-strings.php';
require_once ASTRA_THEME_DIR . 'inc/core/common-functions.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-icons.php';

/**
 * Update theme
 */
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-theme-update.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/astra-update-functions.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-theme-background-updater.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-pb-compatibility.php';


/**
 * Fonts Files
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-font-families.php';
if ( is_admin() ) {
	require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts-data.php';
}

require_once ASTRA_THEME_DIR . 'inc/lib/webfont/class-astra-webfont-loader.php';
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts.php';

require_once ASTRA_THEME_DIR . 'inc/dynamic-css/custom-menu-old-header.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/container-layouts.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/astra-icons.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/block-editor-compatibility.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-walker-page.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-enqueue-scripts.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-gutenberg-editor-css.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/inline-on-mobile.php';
require_once ASTRA_THEME_DIR . 'inc/dynamic-css/content-background.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-dynamic-css.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-global-palette.php';

/**
 * Custom template tags for this theme.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-attr.php';
require_once ASTRA_THEME_DIR . 'inc/template-tags.php';

require_once ASTRA_THEME_DIR . 'inc/widgets.php';
require_once ASTRA_THEME_DIR . 'inc/core/theme-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/admin-functions.php';
require_once ASTRA_THEME_DIR . 'inc/core/sidebar-manager.php';

/**
 * Markup Functions
 */
require_once ASTRA_THEME_DIR . 'inc/markup-extras.php';
require_once ASTRA_THEME_DIR . 'inc/extras.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog-config.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog.php';
require_once ASTRA_THEME_DIR . 'inc/blog/single-blog.php';

/**
 * Markup Files
 */
require_once ASTRA_THEME_DIR . 'inc/template-parts.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-loop.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-mobile-header.php';

/**
 * Functions and definitions.
 */
require_once ASTRA_THEME_DIR . 'inc/class-astra-after-setup-theme.php';

// Required files.
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-helper.php';

require_once ASTRA_THEME_DIR . 'inc/schema/class-astra-schema.php';

if ( is_admin() ) {

	/**
	 * Admin Menu Settings
	 */
	require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-settings.php';
	require_once ASTRA_THEME_DIR . 'inc/lib/astra-notices/class-astra-notices.php';

	/**
	 * Metabox additions.
	 */
	require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-boxes.php';
}

require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-box-operations.php';

/**
 * Customizer additions.
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-customizer.php';

/**
 * Astra Modules.
 */
require_once ASTRA_THEME_DIR . 'inc/modules/related-posts/class-astra-related-posts.php';

/**
 * Compatibility
 */
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-gutenberg.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-jetpack.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/woocommerce/class-astra-woocommerce.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/edd/class-astra-edd.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/lifterlms/class-astra-lifterlms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/learndash/class-astra-learndash.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bb-ultimate-addon.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-contact-form-7.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-visual-composer.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-site-origin.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-gravity-forms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bne-flyout.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-ubermeu.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-divi-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-amp.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-yoast-seo.php';
require_once ASTRA_THEME_DIR . 'inc/addons/transparent-header/class-astra-ext-transparent-header.php';
require_once ASTRA_THEME_DIR . 'inc/addons/breadcrumbs/class-astra-breadcrumbs.php';
require_once ASTRA_THEME_DIR . 'inc/addons/heading-colors/class-astra-heading-colors.php';
require_once ASTRA_THEME_DIR . 'inc/builder/class-astra-builder-loader.php';

// Elementor Compatibility requires PHP 5.4 for namespaces.
if ( version_compare( PHP_VERSION, '5.4', '>=' ) ) {
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor.php';
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor-pro.php';
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-web-stories.php';
}

// Beaver Themer compatibility requires PHP 5.3 for anonymus functions.
if ( version_compare( PHP_VERSION, '5.3', '>=' ) ) {
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-themer.php';
}

require_once ASTRA_THEME_DIR . 'inc/core/markup/class-astra-markup.php';

/**
 * Load deprecated functions
 */
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-filters.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-functions.php';

register_meta( 'user', 'language',  [ 'show_in_rest' => true,
        'type'              => 'string',
        'description'       => '',
        'default'           => '',
        'single'            => true ] );
register_meta( 'user', 'class',  [ 'show_in_rest' => true,
        'type'              => 'string',
        'description'       => '',
        'default'           => '',
        'single'            => true ] );


add_action('rest_api_init', function () {
	register_rest_route('register/', '/subscriber/', [
		'methods' => 'POST',
		'callback' => 'create_rest_user',
		'args' => [
			'id' => [
				'validate_callback' => 'is_numeric',
			],
		],
		'permission_callback' => function () {
			return true;
		},
	]);
});
function create_rest_user($data)
{
	try {
		if (!$data  || !$data['email'] ||  !$data['password'] || !$data['username']) {
			return  ['success' => false, 'message' => 'please add complete details'];
		}
		 $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/'; 
         $email = (preg_match($regex, $data['email']));
		if(!$email) {
			return  ['success' => false, 'message' => 'Email Id is Invalid'];
		}
		$userdata = array(
			'user_login'  			=> $data['username'],
			'user_pass'             => $data['password'],  
			'user_email'            => $data['email'],   
			'first_name'            => $data['firstname'],   
			'last_name'             => $data['lastname'],  
			'role'                  => 'subscriber',
 		);
		
		$id = wp_insert_user( $userdata );
		if (!$id) {
			return ['success' => false, 'message' => 'something went wrong!'];
		} 
		if(is_wp_error($id)) {
			return ['success' => false, 'message' => $id->get_error_message() ];
		}
		return ['success' => true, 'registered' => true, 'message' => $data['email'] . ' Registered successfully!'];
	} catch (Throwable $th) {
		return $th;
	}
}

add_action('rest_api_init', function () {
	register_rest_route('update/', '/metadata/', [
		'methods' => 'POST',
		'callback' => 'update_rest_user',
		'args' => [
			'id' => [
				'validate_callback' => 'is_numeric',
			],
		],
		'permission_callback' => 'is_user_logged_in',
	]);
});
function update_rest_user($data)
{
	try {
		if (!$data  || !$data['language'] ||  !$data['class'] || !$data['ID']) {
			return  ['success' => false, 'message' => 'please add complete details'];
		}
 		$x = update_field( 'language', $data['language'], 'user_' .$data['ID'] );
		$y = update_field( 'class_standard', $data['class'], 'user_' .$data['ID'] );
		return ['success' => true, 'registered' => true, 'message' => $data['ID'] . ' Updated successfully!', 'details' => $data];
	} catch (Throwable $th) {
		return $th;
	}
}

/*Custom Post type start*/
function cw_post_type_news() {
    $supports = array(
        'title', // post title
        'author', // post author
        'excerpt', // post excerpt
        'custom-fields', // custom fields
    );
    $labels = array(
        'name' => _x('Feedback Form', 'plural'),
        'singular_name' => _x('Feedback Form', 'singular'),
        'menu_name' => _x('Feedback Form', 'admin menu'),
        'name_admin_bar' => _x('Feedback Form', 'admin bar'),
        'add_new' => _x('Add New', 'add new'),
        'add_new_item' => __('Add New feedback'),
        'new_item' => __('New feedback'),
        'edit_item' => __('Edit feedback'),
        'view_item' => __('View feedback'),
        'all_items' => __('All feedback'),
        'search_items' => __('Search feedback'),
        'not_found' => __('No feedback found.'),
    );
    $args = array(
        'supports' => $supports,
        'labels' => $labels,
        'public' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'feedback-form'),
        'has_archive' => true,
        'hierarchical' => false,
    );
    register_post_type('feedback-form', $args);
}
add_action('init', 'cw_post_type_news');
/*Custom Post type end*/


add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('sfwd-courses'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}



// *************
add_action('rest_api_init', function () {
	register_rest_route('update/', '/subscriber/', [
		'methods' => 'POST',
		'callback' => 'update_rest_user_data',
		'args' => [
			'id' => [
				'validate_callback' => 'is_numeric',
			],
		],
		'permission_callback' => 'is_user_logged_in',
	]);
});
function update_rest_user_data($data)
{
	try {
		if (!$data  || !$data['email'] ||  !$data['firstname'] || !$data['lastname'] || !$data['id']) {
			return  ['success' => false, 'message' => 'please add complete details'];
		}
		 $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/'; 
         $email = (preg_match($regex, $data['email']));
		if(!$email) {
			return  ['success' => false, 'message' => 'Email Id is Invalid'];
		}
		$userdata = array(
			'user_email'            => $data['email'],   
			'first_name'            => $data['firstname'],   
			'last_name'             => $data['lastname'],
			'ID' => $data['id']
			
 		);
		
		$user_data = wp_update_user(  $userdata  );

		if ( is_wp_error( $user_data ) ) {
					return ['success' => false, 'message' => 'Something went wrong'];
		} else {
			// Success!
				return ['success' => true, 'registered' => true, 'message' => $data['email'] . ' Updated successfully!', 				'details' => array(
			'email'            => $data['email'],   
			'firstName'            => $data['firstname'],   
			'lastName'             => $data['lastname'],
			'id' => $data['id']
			
 		)];
		}

	} catch (Throwable $th) {
				return $th;
	}
}


// *************
add_action('rest_api_init', function () {
	register_rest_route('delete/', '/subscriber/', [
		'methods' => 'DELETE',
		'callback' => 'delete_subscriber',
		'args' => [
			'id' => [
				'validate_callback' => 'is_numeric',
			],
		],
		'permission_callback' => 'is_user_logged_in',
	]);
});
function delete_subscriber($data)
{
	try {
		if (!$data  || !$data['id']) {
			return  ['success' => false, 'message' => 'please add complete details'];
		}
        $user_data = get_userdata($data['id']);
		if (in_array('adminstrator', $user_data->roles)) {
		 return array(
                'success' => false,
                'message' => 'Error deleting user.'
            );
		}
        require_once(ABSPATH.'wp-admin/includes/user.php' );
        if (wp_delete_user($data['id'])) {
            return array(
                'success' => true,
                'message' => 'User deleted successfully.'
            );
        } else {
            return array(
                'success' => false,
                'message' => 'Error deleting user.'
            );
        }

	} catch (Throwable $th) {
				return $th;
	}
}    




