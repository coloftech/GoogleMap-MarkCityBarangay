<?php

/**
 * 
 */
class Mapping_model extends CI_Model
{
	private $table = 'respondents';
	private $table_farm = 'respondents_farm_profile';
	public function getcount($value='')
	{
		# code...
		$sql =  "SELECT city_name, address as complete_address, city as city_code, count(*) as respondents FROM `respondents` group by city_name";
		$query =  $this->db->query($sql);
		return $query->result();

	}
	public function getdetails($city_code=0)
	{
		# code...
		$query = $this->db->select($this->table.'.*,'.$this->table_farm.'.farming_category')
				->from($this->table)
				->join($this->table_farm,$this->table_farm.'.respondent_id = '.$this->table.'.respondent_id','left')
				->where('city',$city_code)
				->get();
			return $query->result();
	}
}
