<?php
echo '<pre>';
print_r($_REQUEST);
echo '</pre>';

$name = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';
$email = isset($_REQUEST["email"]) ? $_REQUEST["email"] : '';
$contact = isset($_REQUEST["phone"]) ? $_REQUEST["phone"] : '';
$enquiryType = isset($_REQUEST["enquiry_type"]) ? $_REQUEST["enquiry_type"] : '';
$project = "Dream Gurukul";
$utm_source = isset($_REQUEST["utm_source"]) ? $_REQUEST["utm_source"] : '';
$utm_medium = isset($_REQUEST["utm_medium"]) ? $_REQUEST["utm_medium"] : '';
$utm_content = isset($_REQUEST["utm_content"]) ? $_REQUEST["utm_content"] : '';
$utm_term = isset($_REQUEST["utm_term"]) ? $_REQUEST["utm_term"] : '';
$network = isset($_REQUEST["network"]) ? $_REQUEST["network"] : '';
$campaign_id = isset($_REQUEST["campaign_id"]) ? $_REQUEST["campaign_id"] : '';
$adgroup_id = isset($_REQUEST["adgroup_id"]) ? $_REQUEST["adgroup_id"] : '';
$gclid = isset($_REQUEST["gclid"]) ? $_REQUEST["gclid"] : '';
$device = isset($_REQUEST["device"]) ? $_REQUEST["device"] : '';
$creative = isset($_REQUEST["creative"]) ? $_REQUEST["creative"] : '';
$placement = isset($_REQUEST["placement"]) ? $_REQUEST["placement"] : '';
$extension_id = isset($_REQUEST["extension_id"]) ? $_REQUEST["extension_id"] : '';
$target_id = isset($_REQUEST["target_id"]) ? $_REQUEST["target_id"] : '';
$loc_interest_ms = isset($_REQUEST["loc_interest_ms"]) ? $_REQUEST["loc_interest_ms"] : '';
$loc_physical_ms = isset($_REQUEST["loc_physical_ms"]) ? $_REQUEST["loc_physical_ms"] : '';
$device_model = isset($_REQUEST["device_model"]) ? $_REQUEST["device_model"] : '';
$keyword = isset($_REQUEST["keyword"]) ? $_REQUEST["keyword"] : '';
$match_type = isset($_REQUEST["match_type"]) ? $_REQUEST["match_type"] : '';
$adposition = isset($_REQUEST["adposition"]) ? $_REQUEST["adposition"] : '';
$source_id = isset($_REQUEST["source_id"]) ? $_REQUEST["source_id"] : '';
$target = isset($_REQUEST["target"]) ? $_REQUEST["target"] : '';

$apikey = "kG6vgYgUqEmnHUtHX15pNQ";
$url = 'https://www.realtybucket.com/webhook/website_form_data';
$myvars = http_build_query([
    'apikey' => $apikey,
    'name' => $name,
    'email' => $email,
    'enquiryType' => $enquiryType,
    'contact' => $contact,
    'project' => $project,
    'utm_source' => $utm_source,
    'utm_medium' => $utm_medium,
    'utm_content' => $utm_content,
    'utm_term' => $utm_term,
    'network' => $network,
    'campaign_id' => $campaign_id,
    'adgroup_id' => $adgroup_id,
    'gclid' => $gclid,
    'device' => $device,
    'creative' => $creative,
    'placement' => $placement,
    'extension_id' => $extension_id,
    'target_id' => $target_id,
    'loc_interest_ms' => $loc_interest_ms,
    'loc_physical_ms' => $loc_physical_ms,
    'device_model' => $device_model,
    'keyword' => $keyword,
    'match_type' => $match_type,
    'adposition' => $adposition,
    'source_id' => $source_id,
    'target' => $target
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $myvars);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
curl_close($ch);

// Add debugging
error_log("Redirecting to thank you page with: name=$name, email=$email, phone=$contact, enquiryType=$enquiryType");

header("Location: https://thejaingroup.com/dream_gurukul_madhyamgram/thankYou.html?name=" . urlencode($name) . "&email=" . urlencode($email) . "&phone=" . urlencode($contact) . "&enquiryType=" . urlencode($enquiryType));
exit();
?>
