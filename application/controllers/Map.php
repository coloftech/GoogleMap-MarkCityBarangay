<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

/**
 * Class : User (UserController)
 * User Class to control all user related operations.
 * @author : Kishor Mali
 * @version : 1.1
 * @since : 15 November 2016
 */


class Mapping extends BaseController
{
    private $userId;

	public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->isLoggedIn();   

        $this->load->model('respondent_model','respondent');
        $this->load->library('CI_messaging','message'); 
        $this->userId = $this->session->userdata('userId');
        $this->load->model('Mapping_model','mapping');
    }

	public function index()
	{

        $respondents = $this->mapping->getcount();
        $address = array();

        foreach ($respondents as $key) {
            # code...
            $address[] = array(
                'id'=> $key->city_code,
                'name'=> $key->city_name,
                'location'=> $key->city_name.', Bohol, Philippines',
                'respondents'=>$key->respondents
            );
        }
        $this->global['mapping'] = true;
        $this->global['address'] = json_encode($address);
        $this->global['pageTitle'] = 'Mapping';
        
        $this->loadViews("map/mapping", $this->global, NULL , NULL);

	}
    public function getrespondents()
    {
        # code...
        $city_code = $this->input->post('city_code');
        
        if ($this->input->post()) {
            # code...
            $result = $this->mapping->getdetails($city_code);
            echo json_encode(array('status'=>true,'details'=>$result));
            exit();
        }
        echo $this->messages->noinput();
            exit();
    }
    public function js()
    {
        # code...
    }


}
